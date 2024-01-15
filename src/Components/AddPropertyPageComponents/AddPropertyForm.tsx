import React, { useState, ChangeEvent, useEffect } from "react";
import { PhotoGrid } from "./PhotoGrid";
import { Console } from "console";
import axios from "axios";
import {
  CreateProperty,
  UpdateProperty,
} from "../../Services/PropertyServices";
import { API_URL, Loginperson, loggedInperson } from "../../API_CONFIG";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddPropertyForm({ id }: { id: string }) {
  const options = ["Bungalow", "Flat", "Chawl"];
  let person = Loginperson();
  
  // alert(JSON.parse(person))
  const [formData, setFormData] = useState({
    title: "",
    type: options[0],
    location: "",
    price: "",
    squareFootage: "",
    contactPerson: "",
    description: "",
    photos: [] as string[], // Ensure that photos is initialized as an empty string array
    userId: person.id,
  });

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    // Fetch property data based on the id when the component mounts
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`${API_URL}property/${id}`); // Replace with your actual API endpoint
        const propertyData = response.data; // Update the state or form data with the fetched data
        setFormData((prevData) => ({
          ...prevData,
          ...propertyData,
        }));
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    if (id) {
      fetchPropertyData();
    }
  }, [id]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleAddPhoto = (photos: string[]) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     photos: photos,
  //   }));
  // };
  const handleAddPhoto = async (photos: File[]) => {
    try {
      const uploadedPhotos = await Promise.all(
        photos.map(async (photo) => {
          const formData = new FormData();
          formData.append("file", photo);
  
          const response = await axios.post(`${API_URL}property/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          console.log("Upload Response:", response);
  
          return response.data.url; // Assuming the backend returns the URL of the uploaded photo
        })
      );
  
      console.log("Uploaded Photos:", uploadedPhotos);
  
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...uploadedPhotos],
      }));
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data: ", formData);

    try {
      if (id) {
        // If 'id' exists, update service
        const updateResult = await UpdateProperty(id, formData);
        console.log("Update Result", updateResult);
        if (updateResult.status === 200) {
          // Show a success toast
          toast.success("Property updated successfully!");
        }
      } else {
        // If 'id' is not present, add service
        const addResult = await CreateProperty(formData);
        console.log("Add Result", addResult);
        if (addResult.status === 200) {
          // Show a success toast
          toast.success("Property added successfully!");
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="bg-gray-300 h-48 w-full ">
          <div className="grid grid-cols-3 ">
            <div className="flex justify-center items-center">
              <PhotoGrid onAddPhoto={handleAddPhoto} />
            </div>
            <div className="flex justify-center items-center">
              <PhotoGrid onAddPhoto={handleAddPhoto} />
            </div>
            <div className="flex justify-center items-center">
              <PhotoGrid onAddPhoto={handleAddPhoto} />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-500 block">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTextChange}
                className="border rounded-md p-3 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block">Type</label>
              <select
                className="border rounded-md p-3 w-full bg-gray-100"
                value={formData.type}
                onChange={handleSelectChange}
                name="type"
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 block">Location</label>
              <input
                type="text"
                name="location"
                onChange={handleTextChange}
                value={formData.location}
                className="border rounded-md p-3 w-full bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-500 block">Price</label>
              <input
                type="text"
                onChange={handleTextChange}
                name="price"
                value={formData.price}
                className="border rounded-md p-3 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block">
                Square Footage
              </label>
              <input
                type="text"
                onChange={handleTextChange}
                name="squareFootage"
                value={formData.squareFootage}
                className="border rounded-md p-3 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block">
                Contact Person
              </label>
              <input
                type="text"
                onChange={handleTextChange}
                name="contactPerson"
                value={formData.contactPerson}
                className="border rounded-md p-3 w-full bg-gray-100"
              />
            </div>
          </div>
          <div className="grid gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-500 block">Description</label>
              <textarea
                className="border rounded-md p-3 w-full h-24 bg-gray-100"
                onChange={handleTextChange}
                value={formData.description}
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="grid gap-4 mt-4">
            <div className="flex justify-center">
              {id ? (
                // If 'id' exists, render the Update button
                <button
                  className="bg-yellow-200 p-3"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update Property
                </button>
              ) : (
                // If 'id' is not present, render the Publish button
                <button
                  className="bg-blue-200 p-3"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Publish this Property
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPropertyForm;
