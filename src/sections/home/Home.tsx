import { useEffect, useState } from "react";

// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Box, Container, Typography, Pagination, Stack } from "@mui/material";
import { useSelector } from "react-redux";
// components
import { ProductCardList } from "../../components/ProductCard";
import { RootState, useAppDispatch } from "../../redux/store";
import { getAllProduct } from "../../redux/slices/productReducer";

type Props = {};

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

export default function HomeSection({}: Props) {
  const { productList } = useSelector((state: RootState) => state.product);
  console.log("productList", productList);
  const dispatch = useAppDispatch();


  // useEffect(() => {
  //   dispatch(getAllProduct());
  // }, []);
  return (
    <RootStyle>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 2, md: 5 },
          }}
        >
          <Box>
            <Box className="">Trang chủ</Box>
          </Box>
          
          
          {/* <ProductCardList productList={productList} /> */}
        </Box>
      </Container>
    </RootStyle>
  );
}
