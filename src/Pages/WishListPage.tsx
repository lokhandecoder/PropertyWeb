import React, { useState } from 'react'
import { API_URL } from '../API_CONFIG';
import LayoutComponent from '../Components/Fixed/LayoutComponent';
import { Property } from './BuyPage';

function WishListPage() {
    const [Data, setData] = useState<Property[]>([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const handleNextPhoto = () => {
        setCurrentPhotoIndex(
          (prevIndex) => (prevIndex + 1) % Data[currentPhotoIndex].photos.length
        );
      };
      const fetchData = async () => {
        try {
            
        } catch (error) {
            
        }
      }
  return (
    <LayoutComponent>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          

          {Data?.map((data, index) => (
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
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutComponent>
  )
}

export default WishListPage