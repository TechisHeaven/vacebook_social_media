import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

const ImageComponent = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      {imageLoaded ? (
        <img src={src} alt="postImage" />
      ) : (
        <div className="text-white bg-white w-full flex flex-col p-4 gap-2">
          <Skeleton animation="wave" variant="rectangular" height={500} />
        </div>
      )}
    </>
  );
};

export default ImageComponent;
