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

export default function StaffList({}: Props) {
  return (
    <Page title="StaffList: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách nhân viên"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Nhân viên", href: PATH_DASHBOARD.staff.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.staff.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm nhân viên
            </Button>
          }
        />
      </Container>
    </Page>
  );
}
