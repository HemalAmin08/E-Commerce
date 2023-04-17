/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Cart() {
  const [increaseQuantity, setIncreaseQuantity] = useState(1);
  const cartProducts = useContext(DataContext);

  const handleDeleteCartProduct = (e, id) => {
    e.preventDefault();
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
    console.log(id, "clicked");
    setIncreaseQuantity((e) => e + 1);
  };

  const handleDecreaseQuantity = (id) => {
    console.log(id, "clicked");
    if (increaseQuantity > 1) {
      return setIncreaseQuantity((e) => e - 1);
    } else {
      return null;
    }
  };

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
                    <TableCell component="th" scope="row">
                      <div className="image-title-style">
                        <img src={image} alt={image} className="image-width" />
                        {title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="span-spacing">
                        <span
                          onClick={() => {
                            handleDecreaseQuantity(id);
                          }}
                          className="cursor-style"
                        >
                          -
                        </span>
                        <span>{increaseQuantity}</span>
                        <span
                          onClick={() => {
                            handleIncreaseQuantity(id);
                          }}
                          className="cursor-style"
                        >
                          +
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>Rs.{price}</TableCell>
                    <TableCell>Rs. total</TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableCell>Cart Total</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
