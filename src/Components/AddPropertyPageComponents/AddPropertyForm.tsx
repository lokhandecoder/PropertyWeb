import React, { useState, ChangeEvent } from "react";
import { PhotoGrid } from "./PhotoGrid";
import { Console } from "console";
import axios from "axios";
import { CreateProperty } from "../../Services/PropertyServices";
import { loggedInperson } from "../../API_CONFIG";

function AddPropertyForm() {
  const options = ['Bungalow', 'Flat', 'Chawl'];
  let person;
  if (loggedInperson !== null) {
    person = JSON.parse(loggedInperson);
    // alert(person);
  } else {
    // Handle the case where loggedInperson is null, if needed
    console.error("No person data found in localStorage");
  }

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
    userId: person.id
  });
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPhoto = (photos: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: photos,
    }));
  };
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Form Data: ', formData);
    try {
      const send = await CreateProperty(formData);
      console.log("Data", send);
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
              <select className="border rounded-md p-3 w-full bg-gray-100" value={formData.type} onChange={handleSelectChange} name="type">
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
              <textarea className="border rounded-md p-3 w-full h-24 bg-gray-100" onChange={handleTextChange} value={formData.description} name="description"></textarea>
            </div>
          </div>
          <div className="grid gap-4 mt-4">
            <div className="flex justify-center">
              <button className="bg-blue-200 p-3" type="submit" onClick={handleSubmit}>Publish this Property</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPropertyForm;
