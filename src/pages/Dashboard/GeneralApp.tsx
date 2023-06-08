// @mui
import { useEffect } from "react";

import { Grid, Container, Typography } from "@mui/material";
// hooks
// components
import Page from "../../components/Page";
import { AnalyticsWidgetSummary } from "../../sections/@dashboard/general";
import { getAllCustomer } from "../../redux/slices/customerReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllStaff } from "../../redux/slices/staffReducer";
import { getAllReceipt } from "../../redux/slices/receiptReducer";
import { getAllRevenueRoutes } from "../../redux/slices/revenueRoutesReducer";
// ----------------------------------------------------------------------

export default function GeneralApp({}) {
  const dispatch = useAppDispatch();

  const { customerList } = useAppSelector((state: any) => state.customer);
  const { staffList } = useAppSelector((state: any) => state.staff);
  const { receiptList } = useAppSelector((state: any) => state.receipt);
  const { revenueRoutesList } = useAppSelector(
    (state: any) => state.revenueRoutes
  );
  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllStaff());
    dispatch(getAllReceipt());
    dispatch(getAllRevenueRoutes());
  }, [dispatch]);

  console.log("customerList ", customerList);
  return (
    <Page title="General: Analytics">
      <Container maxWidth={"xl"}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thống kê
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Khách hàng"
              color="success"
              total={customerList?.length}
              icon={"ant-design:shopping-cart-outlined"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Nhân viên"
              total={staffList?.length}
              color="info"
              icon={"ant-design:user-outlined"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Phiếu thu"
              total={receiptList?.length}
              color="warning"
              icon={"ant-design:user-outlined"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Tuyến thu"
              total={revenueRoutesList?.length}
              color="error"
              icon={"ant-design:user-outlined"}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
