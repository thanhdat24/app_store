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
import BillingPeriodForm from "../../../sections/@dashboard/billingPeriod/BillingPeriodForm";

type Props = {};

export default function BillingPeriodNew({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="Receipt: Create a new receipt">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo kỳ thu" : "Chỉnh sửa kỳ thu"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Kỳ thu", href: PATH_DASHBOARD.receipt.list },
            { name: !isEdit ? "Kỳ thu mới" : id },
          ]}
        />

        <BillingPeriodForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
