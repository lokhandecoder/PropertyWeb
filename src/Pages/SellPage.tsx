import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../Components/Fixed/LayoutComponent";

function SellPage() {
  const navigate = useNavigate();
  const AddNewProperty = () => {
    navigate("/addProperty");
  };
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
            <div className="bg-gray-200 p-4">Item 1</div>
            <div className="bg-gray-200 p-4">Item 1</div>

          </div>
        </div>
      </LayoutComponent>
    </>
  );
}

export default SellPage;
