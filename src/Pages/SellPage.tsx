import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import { Property } from "./BuyPage";
import { API_URL, Loginperson } from "../API_CONFIG";
import { DeleteProperty, GetProperties } from "../Services/PropertyServices";
import DeleteConfirmationDialog from "../Components/Fixed/DeleteConfirmationDialog";

function SellPage() {
  const [Data, setData] = useState<Property[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const person = Loginperson();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const AddNewProperty = () => {
    navigate("/addProperty");
  };
  const handleNextPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex + 1) % Data[currentPhotoIndex].photos.length
    );
  };
  const handleEdit = (propertyId: string) => {
    // Add logic to navigate to the edit page or show an edit modal
    navigate(`/addproperty/${propertyId}`);
    console.log(`Edit property with id: ${propertyId}`);
  };

  const handleDelete = async (propertyId: string) => {
    // Show the delete confirmation dialog
    setPropertyToDelete(propertyId);
    setShowDeleteDialog(true);
  };
  const fetchData = async () => {
    const getData = await GetProperties();
    setData(getData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleConfirmDelete = async () => {
    try {
      if (propertyToDelete !== null) {
        const Delete = await DeleteProperty(propertyToDelete);
        console.log(`Delete property with id: ${propertyToDelete}`);
        fetchData();
      } else {
        // Handle the case where propertyToDelete is null
        console.error("Property to delete is null");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }

    // Close the delete confirmation dialog
    setShowDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation dialog
    setShowDeleteDialog(false);
  };
  const filteredData = Data.filter((property) => {
    return (
     
      person.id === property.userId
    );
  });
  return (
    <>
      <LayoutComponent>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className=" p-4 flex justify-center">
              <button className="bg-blue-200 p-4" onClick={AddNewProperty}>
                Add New Property
              </button>
            </div>
            {filteredData.map((data, index) => (
            <div
              className="md:flex bg-white rounded-xl shadow-md  justify-evenly"
              key={index}
            >
              {/* Property Photos */}
              <div className="md:flex-shrink-0 relative">
                <img
                  className="h-48 w-full object-fit md:w-100"
                  src={
                    data.photos && data.photos.length > 0
                      ? `${API_URL}property${data.photos[currentPhotoIndex]}`
                      : ""
                  }
                  alt={`Property Photo ${currentPhotoIndex + 1}`}
                />

                {data.photos.length > 1 && (
                  <button className="m-4" onClick={handleNextPhoto}>
                    Next
                  </button>
                )}
              </div>

              {/* Property Details */}
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {data.type}
                </div>
                <a
                  href="#"
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {data.title}
                </a>
                <p className="mt-2 text-gray-500">{data.description}</p>
                <div className="mt-4">
                  <span className="text-gray-700">Location:</span>{" "}
                  {data.location}
                </div>
                <div className="mt-2">
                  <span className="text-gray-700">Contact Person:</span>{" "}
                  {data.contactPerson}
                </div>
                <div className="mt-2">
                  <span className="text-gray-700">Price:</span> Rs.
                  {data.price}
                </div>
                <div className="mt-2">
                  <span className="text-gray-700">Square Footage:</span>{" "}
                  {data.squareFootage} sq.ft
                </div>
                {person.id === data.userId && (
                  <div className=" mt-4">
                    <button
                      className="bg-yellow-200 p-2 "
                      onClick={() => handleEdit(data.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-200 p-2 ml-2"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          </div>
        </div>
        <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
      </LayoutComponent>
    </>
  );
}

export default SellPage;
