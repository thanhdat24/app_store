import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import PermissionForm from "../../../sections/@dashboard/permission/PermissionForm";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllPermissions } from "../../../redux/slices/permissionReducer";

type Props = {};

export default function PermissionAction({}: Props) {

  ///

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");
  
  const { permissionList } = useAppSelector((state) => state.permission);

  const currentPermission = permissionList?.find(
    (permission) => permission.IDQUYEN === Number(id)
  );

  useEffect(() => {
    dispatch(getAllPermissions());
  }, [dispatch]);

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

        <PermissionForm isEdit={isEdit} currentPermission={currentPermission}/>
      </Container>
    </Page>
  );
}
