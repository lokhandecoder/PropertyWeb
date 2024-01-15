// PhotoGrid.tsx

import React, { ChangeEvent, useRef } from "react";

interface PhotoGridProps {
  onAddPhoto: (photos: File[]) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ onAddPhoto }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      onAddPhoto(filesArray);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
