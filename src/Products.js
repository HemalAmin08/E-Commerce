/* eslint-disable no-unused-vars */
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Products() {
  const [productData, setProductData] = useState([]);

  const handleProductData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProductData(json));
  };

  const handleWishlist = (id) => {
    console.log("id", id);
  };

  useEffect(() => {
    handleProductData();
  }, []);
  //   console.log(productData, "productData");
  return (
    <>
      <Navbar />
      <Container>
        {/* <Box sx={{ width: "100%", maxWidth: 500, textAlign: "center" }}> */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{ padding: "50px", textAlign: "center" }}
        >
          Feature Products
        </Typography>

        <Grid container spacing={2}>
          <Grid item xl={3}>
            {productData.map(({ image, title, price, id }) => (
              <Card key={id}>
                <CardActionArea>
                  <div className="wishlistIcon">
                    <FavoriteBorderIcon
                      onClick={() => {
                        handleWishlist(id);
                      }}
                    />
                  </div>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={image}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      Title: {title}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Price: {price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
