import React from "react";
//
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { ProductModel } from "../../interfaces/ProductModel";
import { Card, Box, Stack, Link, Typography, Button } from "@mui/material";
import Image from "../Image";
import { useAppDispatch } from "../../redux/store";
import { deleteProductSuccess } from "../../redux/slices/productReducer";
type Props = {
  product: ProductModel;
};

export default function ProductCard(props: Props) {
  console.log("product", props);
  const { product } = props;
  console.log("product", product);
  // const linkTo = PATH_HOME.product.view(paramCase(name));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    console.log("id", id);
    navigate("/edit/" + id);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteProductSuccess(id));
  };
  return (
    <Card>
      <Image alt={product.name} src={product.image} ratio="1/1" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to="/"
          color="inherit"
          component={RouterLink}
          sx={{ textDecoration: "none" }}
        >
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontWeight: "bold", fontSize: 23 }}
          >
            {product.name}
          </Typography>
        </Link>

        {/* <ColorPreview colors={colors} /> */}

        <Typography variant="subtitle1">{product.description}</Typography>

        {/* {priceSale && (
              <Typography
                component="span"
                sx={{ color: "text.disabled", textDecoration: "line-through" }}
              >
                {fCurrency(priceSale)}
              </Typography>
            )} */}

        {/* <Typography variant="subtitle1">{fCurrency(price)}</Typography> */}
        <Typography variant="subtitle1" sx={{ color: "red" }}>
          {product.price}$
        </Typography>
      </Stack>
      <Box sx={{ display: "flex", margin: "5px 7px" }}>
        <Button
          onClick={() => handleEdit(product.id)}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginRight: 2 }}
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(product.id)}
          variant="contained"
          color="error"
          fullWidth
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}
