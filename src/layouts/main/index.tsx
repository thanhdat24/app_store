import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocation, Outlet } from "react-router-dom";
// @mui
// import { Box, Link, Container, Typography, Stack } from "@mui/material";
//
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
type Props = {};

export default function MainLayout({}: Props) {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  return (
    <Box>
      <Stack sx={{ minHeight: 1 }}>
        <MainHeader />

        <Outlet />

        <Box sx={{ flexGrow: 1 }} />

        {!isHome ? (
          <MainFooter />
        ) : (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              position: "relative",
              bgcolor: "background.default",
            }}
          >
            <Container>
              <Typography variant="caption" component="p">
                Copyright © 2023 Lê Thành Đạt
              </Typography>
            </Container>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
