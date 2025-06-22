
import React, { useState } from 'react';

interface Photo {
  photo_url: string;
  is_main: boolean;
  caption: string;
}

interface EstablishmentPhotoGalleryProps {
  photos: Photo[];
  establishmentName: string;
}

const EstablishmentPhotoGallery: React.FC<EstablishmentPhotoGalleryProps> = ({
  photos,
  establishmentName
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const displayPhotos = photos.length > 0 
    ? photos 
    : [{ photo_url: '/placeholder.svg', is_main: true, caption: '' }];

  return (
    <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6 shadow-lg">
      <img
        src={displayPhotos[currentPhotoIndex]?.photo_url || '/placeholder.svg'}
        alt={establishmentName}
        className="w-full h-full object-cover"
      />
      {displayPhotos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {displayPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EstablishmentPhotoGallery;
