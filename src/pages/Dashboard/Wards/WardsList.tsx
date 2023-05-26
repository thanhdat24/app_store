import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Iconify from "../../../components/Iconify";

type Props = {};

export default function WardsList({}: Props) {
  return (
    <Page title="Wards: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách xã phường"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Xã phường", href: PATH_DASHBOARD.wards.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.wards.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm xã phường
            </Button>
          }
        />
      </Container>
    </Page>
  );
}
