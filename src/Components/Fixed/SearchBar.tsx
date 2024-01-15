// SearchBar.tsx

import React, { useState, ChangeEvent } from "react";

interface SearchBarProps {
  onFilterChange: (type: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange }) => {
  const options = ["Bungalow", "Flat", "Chawl"];
  const [type, setType] = useState<string>(options[0]);
  const [location, setLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    onFilterChange(type, location);
    console.log(`Searching for: ${searchQuery}`);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setType(value);
  };
  

  return (
    <div className="flex items-center space-x-1">
      <select
        className="border rounded-md "
        value={type}
        onChange={handleSelectChange}
        name="type"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Location..."
        className="border p-2 rounded"
        value={location}
        onChange={handleLocationChange}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
// import React, { useState } from "react";
// import { Property } from "../../Pages/BuyPage";


// interface SearchBarProps {
//   onFilterChange: (type: string | null, location: string | null) => void;
//   data?: Property[]; // Add this line to make 'data' an optional prop
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange, data = [] }) => {
//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   // Extract unique locations from the property data
//   const locationSet = new Set(data.map((property) => property.location));
//   const locationSuggestions = Array.from(locationSet);

//   // Function to handle changes in the search input
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;
//     setSearchInput(inputValue);

//     // Filter location suggestions based on the inputValue
//     const filteredSuggestions = locationSuggestions.filter((suggestion) =>
//       suggestion.toLowerCase().includes(inputValue.toLowerCase())
//     );

//     setSuggestions(filteredSuggestions);
//   };

//   // Function to handle suggestion selection
//   const handleSuggestionClick = (suggestion: string) => {
//     setSearchInput(suggestion);
//     // Clear suggestions
//     setSuggestions([]);
//   };

//   // Function to handle applying filters when the user presses Enter
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       const [typeFilter, locationFilter] = searchInput.split(" ");
//       onFilterChange(typeFilter, locationFilter);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by type and location..."
//         value={searchInput}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//       />
//       <ul>
//         {suggestions.map((suggestion, index) => (
//           <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//             {suggestion}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;

