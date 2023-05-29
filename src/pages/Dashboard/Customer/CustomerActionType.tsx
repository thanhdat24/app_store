import React from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import TypeForm from "../../../sections/@dashboard/user/Form/TypeForm";

type Props = {};

export default function CustomerActionType({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="CustomerType: Create a new customer type">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? "Tạo loại khách hàng mới" : "Chỉnh sửa loại khách hàng"
          }
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Loại Khách hàng", href: PATH_DASHBOARD.userType.list },
            { name: !isEdit ? "Loại Khách hàng mới" : id },
          ]}
        />

        <TypeForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
