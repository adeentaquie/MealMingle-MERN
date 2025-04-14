// src/components/ImageSlideshow.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextImage, prevImage, setCurrentImageIndex } from "../../redux/slices/slideshowSlice"; // Import actions
import classes from "./ImageSlideshow.module.css";

import burgerImg from "../../assets/burger.jpg";
import curryImg from "../../assets/curry.jpg";
import dumplingsImg from "../../assets/dumplings.jpg";
import macncheeseImg from "../../assets/macncheese.jpg";
import pizzaImg from "../../assets/pizza.jpg";
import schnitzelImg from "../../assets/schnitzel.jpg";
import tomatoSaladImg from "../../assets/tomato-salad.jpg";

const images = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and cheese" },
  { image: pizzaImg, alt: "A delicious pizza" },
  { image: schnitzelImg, alt: "A delicious schnitzel" },
  { image: tomatoSaladImg, alt: "A delicious tomato salad" },
];

export default function ImageSlideshow() {
  const dispatch = useDispatch();
  const { currentImageIndex } = useSelector((state) => state.slideshow); // Get current image index from Redux state

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextImage()); // Dispatch action to move to the next image
    }, 2000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [dispatch]);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.image}
          alt={image.alt}
          className={index === currentImageIndex ? classes.active : ""}
        />
      ))}
    </div>
  );
}
