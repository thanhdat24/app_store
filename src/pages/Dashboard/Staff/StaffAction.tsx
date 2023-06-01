import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import StaffForm from "../../../sections/@dashboard/staff/StaffForm";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllStaff } from "../../../redux/slices/staffReducer";

type Props = {};

export default function StaffAction({}: Props) {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  console.log("isEdit", isEdit);
  const { staffList } = useAppSelector((state) => state.staff);

  const currentStaff = staffList?.find(
    (staff) => staff.IDNHANVIEN === Number(id)
  );

  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  return (
    <Page title="StaffAction: Create a new staff">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo nhân viên" : "Chỉnh sửa nhân viên"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Nhân viên", href: PATH_DASHBOARD.receipt.list },
            { name: !isEdit ? "Nhân viên mới" : id },
          ]}
        />

        <StaffForm isEdit={isEdit} currentStaff={currentStaff} />
      </Container>
    </Page>
  );
}
