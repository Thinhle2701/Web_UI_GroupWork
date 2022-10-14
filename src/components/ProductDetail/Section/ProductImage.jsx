import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
const ProductImage = ({ detail }) => {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    let images = [];
    for (var i = 0; i < detail.length; i++) {
      images.push({
        original: detail[i].url,
        thumbnail: detail[i].url,
      });
    }
    setImages(images);
  }, [detail]);

  return (
    <div
      style={{
        marginRight: "30px",
        maxHeight: "300px",
        maxWidth: "500px",
        marginBottom: "60px",
      }}
    >
      <ImageGallery items={Images} />
    </div>
  );
};

export default ProductImage;
