import PropTypes from "prop-types";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";
// components
import { FormProvider, RHFTextField } from "../../../../components/hook-form";
import {
  createCustomerType,
  resetCustomerType,
  updateCustomerType,
} from "../../../../redux/slices/customerTypeReducer";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { CustomerTypeModel } from "../../../../interfaces/CustomerTypeModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";

type Props = {
  isEdit: boolean;
  currentCustomerType: CustomerTypeModel | undefined;
};

export default function TypeForm({ isEdit, currentCustomerType }: Props) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { createCustomerTypeSuccess, updateCustomerTypeSuccess } =
    useAppSelector((state) => state.customerType);

  const CustomerTypeSchema = Yup.object().shape({
    TENLOAI: Yup.string().required("Tên loại là bắt buộc"),
    TENLOAIPHI: Yup.string().required("Tên loại phí là bắt buộc"),
    GIA: Yup.string().required("Giá là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      IDLOAIKH: currentCustomerType?.IDLOAIKH || "",
      TENLOAI: currentCustomerType?.TENLOAI || "",
      TENLOAIPHI: currentCustomerType?.TENLOAIPHI || "",
      GIA: currentCustomerType?.GIA || "",
    }),
    [currentCustomerType]
  );

  const methods = useForm({
    resolver: yupResolver(CustomerTypeSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCustomerType) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentCustomerType]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      if (isEdit) {
        await dispatch(updateCustomerType(account));
      } else {
        await dispatch(createCustomerType(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createCustomerTypeSuccess || updateCustomerTypeSuccess) {
      navigate(PATH_DASHBOARD.userType.list);
    }
    return () => {
      dispatch(resetCustomerType());
    };
  }, [createCustomerTypeSuccess, updateCustomerTypeSuccess]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 1,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField
                name="IDLOAIKH"
                label="ID loại"
                sx={{ display: "none" }}
              />

              <RHFTextField name="TENLOAI" label="Tên loại" />
              <RHFTextField name="TENLOAIPHI" label="Tên loại phí" />
              <RHFTextField name="GIA" label="Giá" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Lưu thay đổi
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
