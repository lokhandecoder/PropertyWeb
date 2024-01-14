import React from "react";

interface CardProps {
    heading: string;
    subheading: string;
    bgColor: string; // Add a bgColor property to the CardProps
  }

const HomePageCard: React.FC<CardProps> = ({ heading, subheading, bgColor }) => {
  return (
    <>
      <div className={`max-w-lg h-md mx-auto p-12  shadow-md rounded-md flex flex-col items-center justify-center ${bgColor}`}>
        <h2 className="text-xl font-bold mb-2">{heading}</h2>
        <p className="text-sm text-gray-600">{subheading}</p>
      </div>
    </>
  );
};

export default HomePageCard;
