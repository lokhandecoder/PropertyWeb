import React, { useEffect, useState } from "react";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import SearchBar from "../Components/Fixed/SearchBar";
import { GetProperties } from "../Services/PropertyServices";
interface Property {
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
  const [Data, setData] = useState<Property[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const fetchData = async () => {
    const getData = await GetProperties();
    setData(getData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleNextPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex + 1) % Data[currentPhotoIndex].photos.length
    );
  };
  const filteredData = Data.filter((property) => {
    return (
      (!typeFilter || property.type === typeFilter) &&
      (!locationFilter || property.location === locationFilter)
    );
  });

  return (
    <LayoutComponent>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className=" p-4 flex justify-center">
            <SearchBar
              onFilterChange={(type, location) => {
                setTypeFilter(type);
                setLocationFilter(location);
              }}
            />
          </div>
          <div className="bg-gray-200 p-4">Item 1</div>
          {filteredData.map((data, index) => (
            <div className=" bg-white rounded-xl shadow-md " key={index}>
              {/* Card Content */}
              <div className="md:flex">
                <div className="md:flex-shrink-0 relative">
                  <img
                    className="h-48 w-full object-fit md:w-48"
                    src={data.photos[currentPhotoIndex]}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutComponent>
  );
}

export default BuyPage;
