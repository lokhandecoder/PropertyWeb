import React, { useEffect, useState } from "react";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import SearchBar from "../Components/Fixed/SearchBar";
import { DeleteProperty, GetProperties } from "../Services/PropertyServices";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../Components/Fixed/DeleteConfirmationDialog";
import { API_URL, Loginperson } from "../API_CONFIG";
import { toast } from "react-toastify";
import { AddYourWishList } from "../Services/WishListServices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
export interface Property {
  contactPerson: string;
  description: string;
  id: string;
  location: string;
  photos: string[]; // Array of photo URLs
  price: number;
  squareFootage: number;
  title: string;
  type: string;
  userId: string;
}

function BuyPage() {
  const navigate = useNavigate();
  const [Data, setData] = useState<Property[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const person = Loginperson();
  const fetchData = async () => {
    const getData = await GetProperties();
    setData(getData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % Data[currentPhotoIndex].photos.length);
  };
  
  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) =>
        (prevIndex - 1 + Data[currentPhotoIndex].photos.length) % Data[currentPhotoIndex].photos.length
    );
  };

  const filteredData = Data.filter((property) => {
    return (
      (!typeFilter || property.type === typeFilter) &&
      (!locationFilter || property.location === locationFilter)
    );
  });
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

  const handleWishList = async (id: string) => {
    // alert(id)
    if (person.id === 0) {
      // alert("Please Login")
      toast.error("please Login to add in your wishlist");
    } else {
      const ProductId = id;
      const UserId = person.id;
      const sendData = {
        UserId: UserId,
        ProductId: ProductId,
      };
      try {
        const hitData = await AddYourWishList(sendData);
        console.log("Added", hitData);
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error(error);
      }
      // alert(JSON.stringify(sendData));
    }
  };
  const maskPhoneNumber = (phoneNumber: string) => {
    const maskedNumber =
      phoneNumber.length > 4
        ? "*".repeat(phoneNumber.length - 4) + phoneNumber.slice(-4)
        : phoneNumber;
    return maskedNumber;
  };
  return (
    <LayoutComponent>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="p-4 flex justify-center">
            <SearchBar
              onFilterChange={(type, location) => {
                setTypeFilter(type);
                setLocationFilter(location);
              }}
            />
          </div>

          {filteredData.map((data, index) => (
            <div
              className="grid grid-cols-2 gap-4 bg-white rounded-xl shadow-md"
              key={index}
            >
              <div className="relative" style={{ height: "400px" }}>
                <img
                  className="w-full h-full object-cover"
                  src={
                    data.photos && data.photos.length > 0
                      ? `${API_URL}property${data.photos[currentPhotoIndex]}`
                      : ""
                  }
                  alt={`Property Photo ${currentPhotoIndex + 1}`}
                />

                {data.photos.length > 1 && (
                  <>
                    <button className="m-4" onClick={handlePrevPhoto}>
                      Prev
                    </button>
                    <button className="m-4" onClick={handleNextPhoto}>
                      Next
                    </button>
                  </>
                )}
              </div>

              <div className="">
                <div className="p-8">
                  {person.id === data.userId ? (
                    <div className="flex justify-end">
                    <button className="p-2" onClick={() => handleEdit(data.id)}>
                      <EditIcon className="mr-2" style={{ fontSize: '32px' }} />
                    </button>
                    <button className="p-2 ml-2" onClick={() => handleDelete(data.id)}>
                      <DeleteIcon className="mr-2" style={{ fontSize: '32px' }} />
                    </button>
                  </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        className="p-2"
                        onClick={() => handleWishList(data.id)}
                      >
                        <FavoriteIcon
                          className="mr-2"
                          style={{
                            color: isFavorite ? "red" : "black",
                            fontSize: "32px",
                          }}
                        />
                      </button>
                    </div>
                  )}
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
                    {person.id === 0
                      ? maskPhoneNumber(data.contactPerson)
                      : data.contactPerson}
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-700">Price:</span> Rs.
                    {data.price}
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-700">Square Footage:</span>{" "}
                    {data.squareFootage} sq.ft
                  </div>
                </div>
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
  );
}

export default BuyPage;
