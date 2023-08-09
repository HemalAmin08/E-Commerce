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
  const cartProducts = useContext(DataContext);
  // const [cartProductQuantity, setCartProductQuantity] = useState(
  //   cartProducts.globalStateForCartProducts
  // );

  // console.log(cartProducts, "cartProducts");

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

  const totalOfCart = cartProducts?.globalStateForCartProducts?.reduce(
    (prev, cur) => {
      // console.log(prev, "prev");
      // console.log(cur, "cur");
      return prev + cur.quantity * cur.price;
    },
    0
  );

  // console.log(totalOfCart, "totalOfCart");

  const handleIncreaseQuantity = (e, id, quantity) => {
    cartProducts.setGlobalStateForCartProducts(
      cartProducts?.globalStateForCartProducts?.map((ele) => {
        if (ele?.id === id) {
          ele.quantity += 1;
        }
        return ele;
      })
    );
  };

  const handleDecreaseQuantity = (e, id, quantity) => {
    cartProducts.setGlobalStateForCartProducts(
      cartProducts?.globalStateForCartProducts?.map((ele) => {
        if (ele?.id === id && ele?.quantity > 1) {
          ele.quantity -= 1;
        }
        return ele;
      })
    );
  };

  // console.log(cartProducts.globalStateForCartProducts, "cart ptoducts");

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
              {cartProducts.globalStateForCartProducts.map((e) => (
                <TableRow
                  key={Math.random()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <div className="image-title-style">
                      <img src={e?.image} className="image-width" alt="hi" />
                      <div className="title-svg-style">
                        {e?.title}
                        <DeleteForeverSharpIcon
                          className="svg-style"
                          onClick={() => {
                            handleDeleteCartProduct(e?.id);
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="span-spacing">
                      <span
                        onClick={(ele) => {
                          handleDecreaseQuantity(ele, e?.id, e?.quantity);
                        }}
                        className="cursor-style"
                      >
                        -
                      </span>
                      <span>{e?.quantity}</span>
                      <span
                        onClick={(ele) => {
                          handleIncreaseQuantity(ele, e?.id, e?.quantity);
                        }}
                        className="cursor-style"
                      >
                        +
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>Rs.{Math.ceil(e?.price)}</TableCell>
                  <TableCell>Rs. {Math.ceil(e?.quantity * e?.price)}</TableCell>
                </TableRow>
              ))}
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
                  {Math.ceil(totalOfCart)}
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
