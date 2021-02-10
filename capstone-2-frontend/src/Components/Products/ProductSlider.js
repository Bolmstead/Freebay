import React, { useState } from "react";
import Button from '@material-ui/core/Button';


const ImageSlider = () => { // takes in images as props
    const [query, setQuery] = useState("");
    // const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(
        `https://pixabay.com/api/?key=[api-key]&q=${query}`
      )
        .then((response) => response.json())
        .then(({ hits }) => hits.map(({ webformatURL }) => webformatURL))
        // .then(setImages);
    };


    const images = ['https://secure.touchnet.com/C20243_ustores/web/images/product-default-image.png',"https://images-na.ssl-images-amazon.com/images/I/81uVRSP3r0L._SX522_.jpg","https://images-na.ssl-images-amazon.com/images/I/71OhUufDpFL._SX425_PIbundle-12,TopRight,0,0_AA425SH20_.jpg"]

  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    images.length > 0 && (
      <div>
        <Button variant="outlined" color="primary" onClick={slideLeft}>{"<"}</Button>
        <img src={images[index]} alt={index} />
        <img src={images[index+1]} alt={index+1} />
        <Button variant="outlined" color="primary" onClick={slideRight}>{">"}</Button>

      </div>
    )
  );
};

export default ImageSlider;