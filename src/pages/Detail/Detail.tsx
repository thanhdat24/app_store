import React from "react";
// @mui
import { Box, Container } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

type Props = {};

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

export default function Detail({}: Props) {
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
            <div className="">Detail</div>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
