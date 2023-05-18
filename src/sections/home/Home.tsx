import { useEffect, useState } from "react";

// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Box, Container, Typography, Pagination, Stack } from "@mui/material";
// components

type Props = {};

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

export default function HomeSection({}: Props) {
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
            <Typography variant="h2">New Product</Typography>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
