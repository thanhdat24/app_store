import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
// components
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import Iconify from "../../../components/Iconify";
import RHFSelectMultiple from "../../../components/hook-form/RHFSelectMultiple";

type Props = {
  isEdit: boolean;
};

export default function StaffForm({ isEdit }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const NewUserSchema = Yup.object().shape({
    MANHANVIEN: Yup.string().required("Mã nhân viên là bắt buộc"),
    HOTEN: Yup.string().required("Họ tên là bắt buộc"),
    SDT: Yup.string().required("Số điện thoại là bắt buộc"),
    NGAYSINH: Yup.string().required("Ngày sinh là bắt buộc"),
    DIACHI: Yup.string().required("Địa chỉ là bắt buộc"),
    USERNAME: Yup.string().required("Tên đăng nhập là bắt buộc"),
    PASSWORD: Yup.string().required("Mật khẩu là bắt buộc"),
    QUYEN: Yup.string().required("Quyền là bắt buộc"),
    LOAIKHACHHANG: Yup.string().required("Loại khách hàng là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      MANHANVIEN: "",
      HOTEN: "",
      photoURL: "",
      SDT: "",
      DIACHI: "",
      NGAYSINH: dayjs("2022-04-17"),
      USERNAME: "",
      PASSWORD: "",
      QUYEN: "",
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
        <Grid item xs={12} md={6}>
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
              <RHFTextField name="MANHANVIEN" label="Mã nhân viên" />
              <RHFTextField name="HOTEN" label="Họ tên " />
              <RHFTextField
                name="DIACHI"
                label="Địa chỉ"
                sx={{ gridColumn: { sm: "1 / 3" } }}
              />
              <RHFTextField name="SDT" label="Số điện thoại" />
              <Controller
                name="NGAYSINH"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Ngày sinh"
                    defaultValue={dayjs("2022-04-17")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                },
              }}
            >
              <RHFTextField name="USERNAME" label="Tên đăng nhập" />

              <RHFTextField
                name="PASSWORD"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFSelect name="QUYEN" label="Quyền" placeholder="Quyền">
                {/* <option value="" />
                {["Nam", "Nữ"].map((option, index) => (
                  <option value={option}>{option}</option>
                ))} */}
              </RHFSelect>
              {/* 
              <RHFSelectMultiple name="QUYEN" label="Quyền" placeholder="Quyền">
                <option value="" />
                {["Nam", "Nữ"].map((option, index) => (
                  <option value={option}>{option}</option>
                ))}
              </RHFSelectMultiple> */}
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
