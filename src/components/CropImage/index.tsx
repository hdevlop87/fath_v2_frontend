import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { type Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  src: string;
  onCropComplete: (croppedFile: File) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ src, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop | undefined>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.setAttribute('crossOrigin', 'anonymous');
    }
  }, []);

  const onCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
  };

  const onCropCompleteInternal = (crop: PixelCrop) => {
    setCompletedCrop(crop);
    handleCrop(crop);
  };

  const handleCrop = useCallback((crop: PixelCrop) => {
    if (!crop || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
          onCropComplete(file);
        }
      }, 'image/jpeg');
    }
  }, [onCropComplete]);

  return (
    <div className="image-cropper">
      <ReactCrop
        crop={crop}
        onChange={onCropChange}
        onComplete={onCropCompleteInternal}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Source"
          crossOrigin="anonymous"
        />
      </ReactCrop>
    </div>
  );
};

export default ImageCropper;
