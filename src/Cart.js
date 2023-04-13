import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

export default function Cart() {
  const cartProducts = useContext(DataContext);
  const [activeCartProduct, setActiveCartProduct] = useState([]);
  //   const [singleCartItem, setSingleCartIem] = useState([]);
  console.log(cartProducts.globalStateForCartProducts, "cartProducts");

  const handleProductAddedToCart = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        // setActiveCartProduct(
        const filterData = json?.filter((ele) => {
          console.log(
            // ele !== cartProducts.globalStateForCartProducts.includes(ele),
            ele.id,
            "ele in filter cart api"
          );
        });
        setActiveCartProduct(filterData);
        // .map((item) => {
        //   //   setSingleCartIem(item);
        //   console.log(item, "item in map");
        //   return item.id;
        // })
        // );
      });
  };
  
//   const handleCartProduct = (e, id) => {
//     e.preventDefault();
//     const cartData = cartProducts.globalState.filter((d) => {
//       return d.id !== id;
//     });
//     cartProducts.setGlobalState(cartData);
//   };

  console.log(activeCartProduct, "activeCartProduct");
  useEffect(() => {
    handleProductAddedToCart();
  }, []);

  return (
    <>
      <Container>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ padding: "50px", textAlign: "center" }}
        >
          Cart Products
        </Typography>
        <div>
          <Grid container spacing={2}>
            <Grid item xl={6} key={Math.random()}>
              <Card sx={{ display: "flex" }}>
                <CardMedia></CardMedia>
                <div>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <div>
                        <Typography variant="h5" component="div">
                          Title:
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          Price:
                        </Typography>
                        {/* <Button variant="outlined">Add To Cart</Button> */}
                        <DeleteForeverSharpIcon
                        //   onClick={(e) => {
                        //     handleCartProduct(e, id);
                        //   }}
                        />
                      </div>
                    </CardContent>
                  </Box>
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
