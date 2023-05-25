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

type Props = {};

export default function CustomerAction({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="Customer: Create a new customer">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo khách hàng mới" : "Chỉnh sửa khách hàng"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Khách hàng", href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? "Khách hàng mới" : id },
          ]}
        />

        <CustomerForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
