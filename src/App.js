import React, { useState } from "react";
import Products from "./Products";
import Wishlist from "./Wishlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataContext from "./DataContext";

export default function App() {
  const [globalState, setGlobalState] = useState([]);
  return (
    <>
      <DataContext.Provider value={{ globalState, setGlobalState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </>
  );
}
