import React from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import CustomerForm from "../../../sections/@dashboard/user/Form/CustomerForm";
import ReceiptForm from "../../../sections/@dashboard/receipt/ReceiptForm";

type Props = {};

export default function ReceiptAction({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="Receipt: Create a new receipt">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo phiếu thu" : "Chỉnh sửa phiếu thu"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Phiếu thu", href: PATH_DASHBOARD.receipt.list },
            { name: !isEdit ? "Phiếu thu mới" : id },
          ]}
        />

        <ReceiptForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
