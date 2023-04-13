import { Button, Container, IconButton } from "@mui/material";
import "./style.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import DataContext from "./DataContext";
export default function Navbar() {
  const cartProductCount = useContext(DataContext);

  return (
    <>
      <div className="navbar">
        <Container
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <div className="cartStyle">
            <Link to={`/wishlist`}>
              <Button
                variant="outlined"
                className="btnstyle"
                sx={{ float: "right", marginTop: "10px" }}
              >
                Wishlist
              </Button>
            </Link>
            <IconButton
              aria-label="delete"
              color="primary"
              sx={{ marginBottom: "-10px", padding: "10%" }}
            >
              <span className="cart-number">
                {cartProductCount.globalStateForCartProducts.length}
              </span>
              <Link to={`/cart`}>
                <ShoppingCartSharpIcon />
              </Link>
            </IconButton>
          </div>
        </Container>
      </div>
    </>
  );
}
