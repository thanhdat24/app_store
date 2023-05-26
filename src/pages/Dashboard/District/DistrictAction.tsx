import React from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import DistrictForm from "../../../sections/@dashboard/district/DistrictForm";

type Props = {};

export default function DistrictAction({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="District: Create a new district">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo quận huyện" : "Chỉnh sửa quận huyện"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Quận huyện", href: PATH_DASHBOARD.permission.list },
            { name: !isEdit ? "Quận huyện mới" : id },
          ]}
        />

        <DistrictForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
