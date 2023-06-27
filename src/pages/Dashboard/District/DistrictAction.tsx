import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import DistrictForm from "../../../sections/@dashboard/district/DistrictForm";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllDistricts } from "../../../redux/slices/districtReducer";

type Props = {};

export default function DistrictAction({}: Props) {

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");
  const { districtList } = useAppSelector((state) => state.district);

  const currentDistrict = districtList?.find(
    (district) => district.IDQUANHUYEN === Number(id)
  );

  useEffect(() => {
    dispatch(getAllDistricts());
  }, [dispatch]);

  return (
    <Page title="District: Create a new district">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo quận huyện" : "Chỉnh sửa quận huyện"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Quận huyện", href: PATH_DASHBOARD.district.list },
            { name: !isEdit ? "Quận huyện mới" : id },
          ]}
        />

        <DistrictForm isEdit={isEdit} currentDistrict={currentDistrict} />
      </Container>
    </Page>
  );
}
