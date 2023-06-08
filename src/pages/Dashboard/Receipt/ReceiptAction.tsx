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
import {
  getAllCustomer,
  getDetailCustomer,
} from "../../../redux/slices/customerReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllBillingPeriods } from "../../../redux/slices/billingPeriodReducer";

type Props = {};

export default function ReceiptAction({}: Props) {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");

  const { customerList } = useAppSelector((state) => state.customer);

  const currentCustomer = customerList?.find(
    (customer) => customer.IDKHACHHANG === Number(id)
  );

  console.log("currentCustomer", currentCustomer);

  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllBillingPeriods());
  }, [dispatch]);

  return (
    <Page title="Receipt: Create a new receipt">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo phiếu thu" : "Chỉnh sửa phiếu thu"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Phiếu thu", href: PATH_DASHBOARD.receipt.list },
            { name: !isEdit ? "Phiếu thu mới" : id },
          ]}
        />

        <ReceiptForm isEdit={isEdit} currentCustomer={currentCustomer} />
      </Container>
    </Page>
  );
}
