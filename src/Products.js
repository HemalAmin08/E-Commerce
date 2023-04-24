/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { style } from "@mui/system";
import DataContext from "./DataContext";
import "./style.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
export default function Products() {
  const dataActive = useContext(DataContext);
  const [productData, setProductData] = useState([]);
  const [activeItem, setActiveItem] = useState([]);
  // const [activeColor, setAciveColor] = useState([]);
  // console.log(dataActive, "dataActive");
  const handleProductData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProductData(json?.map((obj) => ({ ...obj, active: false })));
      });
  };

  const handleWishlist = (id, active) => {
    const updatedStates = productData?.map((data) => {
      if (data.id === id) {
        const doubleData = dataActive.globalState.filter((g) => {
          if (!data.active) {
            return g.id !== id;
          }
        });
        dataActive.setGlobalState(doubleData);
        return { ...data, active: !data.active };
      }
      return data;
    });
    setProductData(updatedStates);

    if (dataActive.activeProduct.includes(id)) {
      const filteredId = dataActive.activeProduct.filter((a) => {
        return a !== id;
      });
      dataActive.setactiveProduct(filteredId);
    } else {
      dataActive.setactiveProduct([...dataActive.activeProduct, id]);
    }

    // if (!active) {
    //   dataActive.setactiveProduct([...dataActive.activeProduct, id]);
    // } else if (active) {
    //   const filteredId = dataActive.activeProduct.filter((a) => {
    //     return a !== id;
    //   });
    //   dataActive.setactiveProduct(filteredId);
    // }
  };

  const handleCart = (ele) => {
    ele["quantity"] = 1;
    if (dataActive.globalStateForCartProducts.includes(ele)) {
      const cartDupId = dataActive.globalStateForCartProducts.filter((m) => {
        return m !== ele;
      });
      dataActive.setGlobalStateForCartProducts(cartDupId);
    } else {
      dataActive.setGlobalStateForCartProducts([
        ...dataActive.globalStateForCartProducts,
        ele,
      ]);
    }

    if (dataActive.cartId.includes(ele.id)) {
      const filterCart = dataActive.cartId.filter((a) => {
        return a !== ele.id;
      });
      dataActive.setCartId(filterCart);
      NotificationManager.warning("Product Removed From Cart Successfully");
    } else {
      dataActive.setCartId([...dataActive.cartId, ele.id]);
      NotificationManager.success("Product Added To Cart Successfully");
    }
  };

  useEffect(() => {
    productData.forEach((item) => {
      if (item.active === true) {
        dataActive.setGlobalState([...dataActive.globalState, item]);
      }
    });
  }, [productData]);

  useEffect(() => {
    handleProductData();
  }, []);

  // console.log(dataActive, "da");

  return (
    <>
      <Navbar />
      <Container>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ padding: "50px", textAlign: "center" }}
        >
          Feature Products
        </Typography>

        <Grid container spacing={2}>
          {productData?.map((ele) => {
            return (
              <Grid item xl={4} key={ele.id}>
                <Card key={ele.id} sx={{ height: "100%" }}>
                  <CardActionArea>
                    <div className="wishlistIcon">
                      <FavoriteBorderIcon
                        onClick={() => {
                          handleWishlist(ele.id, ele.active);
                        }}
                        style={{
                          color: dataActive.activeProduct.includes(ele.id)
                            ? "red"
                            : "",
                        }}
                      />
                    </div>
                    <CardMedia
                      component="img"
                      height="140"
                      image={ele.image}
                      alt={ele.image}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography gutterBottom>Title: {ele.title}</Typography>
                      <Typography gutterBottom variant="body2" component="div">
                        Price: {ele.price}
                      </Typography>
                    </CardContent>
                    <Box pl={2} mt="auto" pb={2}>
                      <Button
                        variant={
                          dataActive.cartId.includes(ele.id)
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => {
                          handleCart(ele);
                        }}
                      >
                        Add To Cart
                      </Button>
                      <NotificationContainer />
                    </Box>
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
