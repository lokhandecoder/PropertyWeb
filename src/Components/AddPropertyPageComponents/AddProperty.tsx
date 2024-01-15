import React from "react";
import { useNavigate } from "react-router-dom";
import AddPropertyForm from "./AddPropertyForm";

function AddProperty({ id }: { id: string }) {
  const navigate = useNavigate();
  const AddNewProperty = () => {
    navigate("/addProperty");
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <div className=" ">
          <AddPropertyForm  id={id}/>
        </div>
      </div>
    </>
  );
}

export default AddProperty;
