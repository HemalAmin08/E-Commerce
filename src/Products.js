/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
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
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { style } from "@mui/system";
import DataContext from "./DataContext";
import "./style.css";

export default function Products() {
  const dataActive = useContext(DataContext);
  const [productData, setProductData] = useState([]);
  const [activeItem, setActiveItem] = useState([]);
  // const [activeColor, setAciveColor] = useState([]);

  const handleProductData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProductData(json?.map((obj) => ({ ...obj, active: false })));
      });
  };

  const handleWishlist = (id) => {
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
  };

  console.log(dataActive.globalState, "globalstate");

  useEffect(() => {
    dataActive.globalState.map((ele) => {
      dataActive.setactiveProduct([...dataActive.activeProduct, ele.id]);
    });
  }, [dataActive.globalState]);

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
          {productData?.map(({ image, title, price, id }) => {
            return (
              <Grid item xl={4} key={id}>
                <Card key={id} sx={{ height: "100%" }}>
                  <CardActionArea>
                    <div className="wishlistIcon">
                      <FavoriteBorderIcon
                        onClick={() => {
                          handleWishlist(id);
                        }}
                        className={
                          dataActive.activeProduct.includes(id)
                            ? "redColor"
                            : ""
                        }
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
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
