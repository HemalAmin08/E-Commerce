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
import { style } from "@mui/system";

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [productStates, setProductStates] = useState([]);
  const [activeData, setActiveData] = useState([]);

  const handleProductData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProductData(json);
        setProductStates(
          json?.map(({ title, id }) => ({
            title: title,
            id: id,
            active: false,
          }))
        );
      });
  };
  // console.log(productData, "pd");
  const handleWishlist = (id) => {
    // console.log("id", id);
    const updatedStates = productStates?.map((data) => {
      // console.log(data, "ddd");
      if (data.id === id) {
        return { ...data, active: !data.active };
      }
      return data;
      // console.log(data.id);
    });
    setProductStates(updatedStates);
  };

  // console.log(productStates, "productStates");
  // console.log(productData, "productData");
  useEffect(() => {
    productStates.map((e) => {
      if (e.active === true) {
        return setActiveData([...activeData, e.id]);
      }
    });
  }, [productStates]);

  console.log(activeData, "activeData");

  useEffect(() => {
    handleProductData();
  }, []);

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
          {productData?.length &&
            productData.map(({ image, title, price, id }) => {
              const findId = productStates.find((ele) => ele.id === id);
              return (
                <Grid item xl={4} key={id}>
                  <Card key={id} sx={{ height: "100%" }}>
                    <CardActionArea>
                      <div className="wishlistIcon">
                        <FavoriteBorderIcon
                          onClick={() => {
                            handleWishlist(id);
                          }}
                          style={{
                            color: findId.active ? "red" : "",
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
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          Price: {price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}
