import React from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import WardsForm from "../../../sections/@dashboard/wards/WardsForm";

type Props = {};

export default function WardsAction({}: Props) {
  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  return (
    <Page title="Wards: Create a new wards">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo xã phường" : "Chỉnh sửa xã phường"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Xã phường", href: PATH_DASHBOARD.wards.list },
            { name: !isEdit ? "Xã phường mới" : id },
          ]}
        />

        <WardsForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
