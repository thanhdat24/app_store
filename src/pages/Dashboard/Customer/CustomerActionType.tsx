import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import TypeForm from "../../../sections/@dashboard/user/Form/TypeForm";
import { getAllCustomerTypes } from "../../../redux/slices/customerTypeReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

type Props = {};

export default function CustomerActionType({}: Props) {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { id = "" } = useParams();

  const isEdit = pathname.includes("edit");
  const { customerTypeList } = useAppSelector((state) => state.customerType);

  const currentCustomerType = customerTypeList?.find(
    (customer) => customer.IDLOAIKH === Number(id)
  );

  useEffect(() => {
    dispatch(getAllCustomerTypes());
  }, [dispatch]);

  return (
    <Page title="CustomerType: Create a new customer type">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? "Tạo loại khách hàng mới" : "Chỉnh sửa loại khách hàng"
          }
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Loại Khách hàng", href: PATH_DASHBOARD.userType.list },
            { name: !isEdit ? "Loại Khách hàng mới" : id },
          ]}
        />

        <TypeForm isEdit={isEdit} currentCustomerType={currentCustomerType} />
      </Container>
    </Page>
  );
}
