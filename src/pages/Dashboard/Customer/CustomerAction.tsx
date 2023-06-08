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
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllCustomer } from "../../../redux/slices/customerReducer";

type Props = {};

export default function CustomerAction({}: Props) {

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");
  
  const { customerList } = useAppSelector((state) => state.customer);

  const currentCustomer = customerList?.find(
    (customer) => customer.IDKHACHHANG === Number(id)
  );

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);
  return (
    <Page title="Customer: Create a new customer">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Tạo khách hàng mới" : "Chỉnh sửa khách hàng"}
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Khách hàng", href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? "Khách hàng mới" : id },
          ]}
        />

        <CustomerForm isEdit={isEdit} currentCustomer={currentCustomer}/>
      </Container>
    </Page>
  );
}
