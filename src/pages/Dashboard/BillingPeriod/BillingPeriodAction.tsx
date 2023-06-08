import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import CustomerForm from "../../../sections/@dashboard/user/Form/CustomerForm";
import ReceiptForm from "../../../sections/@dashboard/receipt/ReceiptForm";
import BillingPeriodForm from "../../../sections/@dashboard/billingPeriod/BillingPeriodForm";
import { getAllBillingPeriods } from "../../../redux/slices/billingPeriodReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

type Props = {};

export default function BillingPeriodAction({}: Props) {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");
  const { billingPeriodList } = useAppSelector((state) => state.billingPeriod);
  console.log("billingPeriodList", billingPeriodList);

  const currentBillingPeriod = billingPeriodList?.find(
    (billingPeriod) => billingPeriod.IDKYTHU === Number(id)
  );

  useEffect(() => {
    dispatch(getAllBillingPeriods());
  }, [dispatch]);

  return (
    <Page title="Receipt: Create a new receipt">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo kỳ thu" : "Chỉnh sửa kỳ thu"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Kỳ thu", href: PATH_DASHBOARD.billingPeriod.list },
            { name: !isEdit ? "Kỳ thu mới" : id },
          ]}
        />

        <BillingPeriodForm
          isEdit={isEdit}
          currentBillingPeriod={currentBillingPeriod}
        />
      </Container>
    </Page>
  );
}
