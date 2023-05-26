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

export default function BillingPeriodList({}: Props) {
  return (
    <Page title="BillingPeriod: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách kỳ thu"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Kỳ thu", href: PATH_DASHBOARD.receipt.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.billingPeriod.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm kỳ thu
            </Button>
          }
        />
      </Container>
    </Page>
  );
}
