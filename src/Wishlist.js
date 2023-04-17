import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import DataContext from "./DataContext";
import "./style.css";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

export default function Wishlist() {
  const activeProductData = useContext(DataContext);
  console.log(activeProductData, "activeProductData");

  // eslint-disable-next-line no-unused-vars
  const handleDeleteWishlist = (e, id) => {
    e.preventDefault();
    const wishlistedData = activeProductData.globalState.filter((d) => {
      return d.id !== id;
    });
    activeProductData.setGlobalState(wishlistedData);
    const filteredWishlistProduct = activeProductData.activeProduct.filter(
      (a) => {
        return a !== id;
      }
    );
    activeProductData.setactiveProduct(filteredWishlistProduct);
  };

  useEffect(() => {
    const dataarr = activeProductData.globalState.filter((s) => {
      return activeProductData.activeProduct.includes(s.id);
    });
    activeProductData.setGlobalState(dataarr);
  }, []);
  
  return (
    <>
      <Container>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ padding: "50px", textAlign: "center" }}
        >
          My Wishlist
        </Typography>
        <div>
          <Grid container spacing={2}>
            {activeProductData.globalState.map(
              ({ title, price, image, id }) => {
                return (
                  <Grid item xl={6} key={Math.random()}>
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        image={image}
                        alt="Live from space album cover"
                      />
                      <div>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <div>
                              <Typography variant="h5" component="div">
                                Title: {title}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="body2"
                                component="div"
                              >
                                Price: {price}
                              </Typography>
                              {/* <Button variant="outlined">Add To Cart</Button> */}
                              <DeleteForeverSharpIcon
                                onClick={(e) => {
                                  handleDeleteWishlist(e, id);
                                }}
                              />
                            </div>
                          </CardContent>
                        </Box>
                      </div>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        </div>
      </Container>

      {/* {activeProductData.globalState.map((val) => console.log(val, "val"))} */}
    </>
  );
}
