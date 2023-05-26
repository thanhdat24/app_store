import React from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import PermissionForm from "../../../sections/@dashboard/permission/PermissionForm";

type Props = {};

export default function PermissionAction({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="Permission: Create a new permission">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo quyền" : "Chỉnh sửa quyền"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Quyền", href: PATH_DASHBOARD.permission.list },
            { name: !isEdit ? "Quyền mới" : id },
          ]}
        />

        <PermissionForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
