import React from "react";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import SearchBar from "../Components/Fixed/SearchBar";
import HomePageGrid from "../Components/HomePageCOmponenets/HomePageGrid";
import { TypeAnimation } from "../Components/HomePageCOmponenets/TypeAnimation";

function HomePage() {
  return (
    <LayoutComponent>
      <div className="searchBar">
        <TypeAnimation />
      </div>
      <HomePageGrid />
    </LayoutComponent>
  );
}

export default HomePage;
