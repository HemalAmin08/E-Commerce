import { Button, Container, IconButton } from "@mui/material";
import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
export default function Navbar() {
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
              <span className="cart-number">1</span>
              <ShoppingCartSharpIcon />
            </IconButton>
          </div>
        </Container>
      </div>
    </>
  );
}
