import React from 'react'
import HomePageCard from './HomePageCard'
import { CardData } from '../../Model/Data'

function HomePageGrid() {

  return (
    <>
       <div className="flex flex-wrap">
        {CardData.map((data, index) => (
            <div className="w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 bg-gray-200 p-4" key={index}>
            <HomePageCard heading={data.cardheading} subheading={data.cardInfo} bgColor={data.bgColor} />
          </div>
        ))}
    </div>
    </>
  )
}

export default HomePageGrid