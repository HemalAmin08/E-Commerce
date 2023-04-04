import React, { useContext } from "react";
import DataContext from "./DataContext";

export default function Wishlist() {
  const activeProductData = useContext(DataContext);
  console.log(activeProductData, "activeProductData");
  return <div>Wishlist</div>;
}
