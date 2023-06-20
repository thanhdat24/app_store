// @mui
import { useEffect } from "react";

import { Grid, Container, Typography, Box } from "@mui/material";
// hooks
// components
import Page from "../../components/Page";
import { AnalyticsWidgetSummary } from "../../sections/@dashboard/general";
import {
  getAllCustomer,
  resetCustomer,
  resetCustomerSuccess,
} from "../../redux/slices/customerReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllStaff } from "../../redux/slices/staffReducer";
import { getAllReceipt, resetReceipt } from "../../redux/slices/receiptReducer";
import { getAllRevenueRoutes } from "../../redux/slices/revenueRoutesReducer";
import {
  getBillingPeriodByCashier,
  getCustomersByCashier,
} from "../../redux/slices/cashierReducer";
import RevenueStatistics from "../../sections/@dashboard/general/statistics/RevenueStatistics";
import RevenueQuantity from "../../sections/@dashboard/general/statistics/RevenueQuantity";
// ----------------------------------------------------------------------

export default function GeneralApp({}) {
  const dispatch = useAppDispatch();

  const { customerList } = useAppSelector((state: any) => state.customer);
  const { staffList } = useAppSelector((state: any) => state.staff);
  const { receiptList } = useAppSelector((state: any) => state.receipt);
  const { revenueRoutesList } = useAppSelector(
    (state: any) => state.revenueRoutes
  );
  const { customersByCashierList, billingPeriodByCashierList } = useAppSelector(
    (state: any) => state.cashier
  );
  const { userLogin } = useAppSelector((state: any) => state.admin);
  useEffect(() => {
    if (userLogin.USERNAME === "admin") {
      dispatch(getAllCustomer());
      dispatch(getAllStaff());
      dispatch(getAllReceipt());
      dispatch(getAllRevenueRoutes());
    } else {
      dispatch(getCustomersByCashier(Number(userLogin?.IDNHANVIEN)));
      dispatch(getBillingPeriodByCashier(Number(userLogin?.IDNHANVIEN)));
      dispatch(getAllStaff());
    }

    return () => {
      dispatch(resetCustomer());
      dispatch(resetReceipt());
    };
  }, [dispatch]);

  return (
    <Page title="General: Analytics">
      <Box>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thống kê
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Khách hàng"
              color="success"
              total={customerList?.length || customersByCashierList?.length}
              icon={"mdi:people"}
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
              total={receiptList?.length || billingPeriodByCashierList?.length}
              color="warning"
              icon={"fluent:receipt-28-filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Tuyến thu"
              total={
                revenueRoutesList?.length ||
                Array.from(
                  new Set(
                    customersByCashierList?.map(
                      (option: any) => option.TUYENTHU.TENTUYENTHU
                    )
                  )
                )?.length
              }
              color="error"
              icon={"clarity:map-solid"}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <RevenueStatistics />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid item xs={12} md={12} lg={12}>
              <RevenueQuantity />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
