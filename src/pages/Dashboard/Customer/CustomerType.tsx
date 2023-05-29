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

export default function CustomerType({}: Props) {
  return (
    <Page title="Customer Type: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách khách hàng"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Loại Khách hàng", href: PATH_DASHBOARD.userType.root },
            { name: "Danh sách loại" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.userType.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm loại khách hàng
            </Button>
          }
        />
      </Container>
    </Page>
  );
}
