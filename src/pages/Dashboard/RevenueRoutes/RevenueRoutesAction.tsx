import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllRevenueRoutes } from "../../../redux/slices/revenueRoutesReducer";
import RevenueRoutesForm from "../../../sections/@dashboard/revenueStream/RevenueRoutesForm";

type Props = {};

export default function RevenueRoutesAction({}: Props) {

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  console.log("isEdit", isEdit);
  const { revenueRoutesList } = useAppSelector((state) => state.revenueRoutes);

  const currentRevenueRoutes = revenueRoutesList?.find(
    (revenueRoutes) => revenueRoutes.IDTUYENTHU === Number(id)
  );

  useEffect(() => {
    dispatch(getAllRevenueRoutes());
  }, [dispatch]);

  return (
    <Page title="RevenueRoutes: Create a new Revenue Routes">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo tuyến thu" : "Chỉnh sửa tuyến thu"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Tuyến thu", href: PATH_DASHBOARD.revenueRoutes.list },
            { name: !isEdit ? "Tuyến thu mới" : id },
          ]}
        />

        <RevenueRoutesForm isEdit={isEdit} currentRevenueRoutes={currentRevenueRoutes}/>
      </Container>
    </Page>
  );
}
