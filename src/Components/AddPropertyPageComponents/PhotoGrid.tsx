import React, { useState, ChangeEvent, useRef } from 'react';

export const PhotoGrid: React.FC<{ onAddPhoto: (photos: string[]) => void }> = ({ onAddPhoto }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedPhotos = e.target.files;
    if (selectedPhotos) {
      const newPhotoUrls = Array.from(selectedPhotos).map(photo =>
        URL.createObjectURL(photo)
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotoUrls]);
      onAddPhoto([...photos, ...newPhotoUrls]); // Notify the parent component about the new photos
    }
  };

  const handleAddButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="photo-grid-container flex items-center">
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index + 1}`} className="object-cover h-48 w-full" />
      ))}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddPhoto}
        style={{ display: 'none' }}
        ref={fileInputRef}
        id="photoInput"
      />
      <label htmlFor="photoInput">
        <button onClick={handleAddButtonClick}>Add Photo</button>
      </label>
    </div>
  );
};
