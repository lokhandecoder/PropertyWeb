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
