import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Switch, Typography } from "@mui/material";
// components
import Label from "../../../components/Label";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import Iconify from "../../../components/Iconify";

type Props = {
  isEdit: boolean;
};

export default function ReceiptForm({ isEdit }: Props) {
  const NewUserSchema = Yup.object().shape({
    MAUSOPHIEU: Yup.string().required("Mẫu số phiếu là bắt buộc"),
    KYHIEU: Yup.string().required("Ký hiệu là bắt buộc"),
    KHACHHANG: Yup.string().required("Khánh hàng là bắt buộc"),
    KYTHU: Yup.string().required("Kỳ thu là bắt buộc"),
    TUYENTHU: Yup.string().required("Phiếu thu là bắt buộc"),
    TRANGTHAIPHIEU: Yup.string().required("Trạng thái phiếu là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      MAUSOPHIEU: "",
      KYHIEU: "",
      photoURL: "",
      KHACHHANG: "",
      KYTHU: dayjs(new Date()),
      TUYENTHU: "",
      TRANGTHAIPHIEU: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
    if (isEdit) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="MAUSOPHIEU" label="Mẫu số phiếu" />
              <RHFTextField name="KYHIEU" label="Ký hiệu" />
              <RHFSelect
                name="KHACHHANG"
                label="Khách hàng"
                placeholder="Khách hàng"
              >
                {/* <option value="" />
                {["Nam", "Nữ"].map((option, index) => (
                  <option value={option}>{option}</option>
                ))} */}
              </RHFSelect>
              <RHFSelect
                name="TUYENTHU"
                label="Tuyến thu"
                placeholder="Tuyến thu"
              >
                {/* <option value="" />
                {["Nam", "Nữ"].map((option, index) => (
                  <option value={option}>{option}</option>
                ))} */}
              </RHFSelect>
              <Controller
                name="KYTHU"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Kỳ thu"
                    defaultValue={dayjs(new Date())}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Chưa thu</Typography>
                <Controller
                  name="TRANGTHAIPHIEU"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      name="activePublic"
                      checked={field.value}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Typography>Đã thu</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <LoadingButton
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Lưu thay đổi
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
