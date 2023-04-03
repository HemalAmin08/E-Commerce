import { Button, Container } from "@mui/material";
import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <Container
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <Link to={`/wishlist`}>
            <Button
              variant="outlined"
              className="btnstyle"
              sx={{ float: "right", marginTop: "10px" }}
            >
              Wishlist
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
}
