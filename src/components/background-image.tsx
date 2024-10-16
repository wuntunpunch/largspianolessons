import React from "react";
import Image from "next/image";

interface BackgroundImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  overlayOpacity?: number; // Tailwind opacity classes
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt,
  priority = false,
  overlayOpacity = 0.3,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        priority={priority}
        className="z-0"
      />
      <div
        className={`absolute inset-0 bg-black  z-10`}
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default BackgroundImage;
