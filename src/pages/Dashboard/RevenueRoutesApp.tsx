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

export default function RevenueRoutesApp({}) {
  const dispatch = useAppDispatch();

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
          Thống kê tình hình tuyến thu
        </Typography>

        <Grid container spacing={3}>
          {userLogin.USERNAME === "admin" && (
            <>
              <Grid item xs={12} md={12} lg={12}>
                <RevenueStatistics />
              </Grid>
              <Grid item xs={12} md={4}></Grid>
            </>
          )}
        </Grid>
      </Box>
    </Page>
  );
}
