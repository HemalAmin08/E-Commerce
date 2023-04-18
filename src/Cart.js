/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartProductQuantity, setCartProductQuantity] = useState(1);
  const cartProducts = useContext(DataContext);

  const handleDeleteCartProduct = (id) => {
    const cartProductItem = cartProducts.globalStateForCartProducts.filter(
      (s) => {
        return s.id !== id;
      }
    );
    cartProducts.setGlobalStateForCartProducts(cartProductItem);

    const filterCartProductData = cartProducts.cartId.filter((f) => {
      return f !== id;
    });
    cartProducts.setCartId(filterCartProductData);
  };

  const handleIncreaseQuantity = (id) => {
    // console.log(id, "clicked");
    setCartProductQuantity((e) => e + 1);
  };

  const handleDecreaseQuantity = (id) => {
    // console.log(id, "clicked");
    if (cartProductQuantity > 1) {
      return setCartProductQuantity((e) => e - 1);
    } else {
      return null;
    }
  };

  // console.log(cartProducts, "cartProducts");

  useEffect(() => {
    const dataCart = cartProducts.globalStateForCartProducts.filter((x) => {
      return cartProducts.cartId.includes(x.id);
    });
    cartProducts.setGlobalStateForCartProducts(dataCart);
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
        <div className="home-button-style">
          <Link to={`/`}>
            <Button variant="contained">Back to home</Button>
          </Link>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>item(s)</TableCell>
                <TableCell align="right">quantity</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartProducts.globalStateForCartProducts.map(
                ({ price, title, image, id }) => (
                  <TableRow
                    key={Math.random()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <div className="image-title-style">
                        <img src={image} alt={image} className="image-width" />
                        <div className="title-svg-style">
                          {title}
                          <DeleteForeverSharpIcon
                            className="svg-style"
                            onClick={() => {
                              handleDeleteCartProduct(id);
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="span-spacing">
                        <span
                          onClick={(e) => {
                            handleDecreaseQuantity(e, id);
                          }}
                          className="cursor-style"
                        >
                          -
                        </span>
                        <span>{cartProductQuantity}</span>
                        <span
                          onClick={(e) => {
                            handleIncreaseQuantity(e, id);
                          }}
                          className="cursor-style"
                        >
                          +
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>Rs.{price}</TableCell>
                    <TableCell>Rs. {cartProductQuantity * price}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {cartProducts.cartId.length ? (
          <div className="margin-style">
            <Card>
              <CardContent className="cart-total">
                <Typography variant="subtitle2" gutterBottom>
                  Cart Total
                </Typography>
                <Typography variant="p" gutterBottom>
                  15002
                </Typography>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                className="cart-empty-style"
              >
                Oops! Your Cart Is Empty
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}
