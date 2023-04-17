import React, { useState } from "react";
import Products from "./Products";
import Wishlist from "./Wishlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataContext from "./DataContext";
import Cart from "./Cart";

export default function App() {
  const [globalState, setGlobalState] = useState([]);
  const [activeProduct, setactiveProduct] = useState([]);
  const [globalStateForCartProducts, setGlobalStateForCartProducts] = useState(
    []
  );
  const [cartId, setCartId] = useState([]);
  return (
    <>
      <DataContext.Provider
        value={{
          globalState,
          activeProduct,
          globalStateForCartProducts,
          cartId,
          setGlobalState,
          setactiveProduct,
          setGlobalStateForCartProducts,
          setCartId,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </>
  );
}
