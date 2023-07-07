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
  Autocomplete,
} from "@mui/material";
// components
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import Iconify from "../../../components/Iconify";
import RHFSelectMultiple from "../../../components/hook-form/RHFSelectMultiple";
import { StaffModel } from "../../../interfaces/StaffModel";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  createStaff,
  resetStaff,
  updateStaff,
} from "../../../redux/slices/staffReducer";
import RHFDatePickerField from "../../../components/hook-form/RHFDatePickerField";

type Props = {
  isEdit: boolean;
  currentStaff: StaffModel | undefined;
};

export default function StaffForm({ isEdit, currentStaff }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  ///---
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { createStaffSuccess, updateStaffSuccess } = useAppSelector(
    (state) => state.staff
  );

  const StaffSchema = Yup.object().shape({
    MANHANVIEN: Yup.string()
      .required("Mã nhân viên là bắt buộc")
      .matches(/^\S+$/, "Không được chứa khoảng trống")
      .min(3, "Phải có ít nhất 5 ký tự"),
    HOTEN: Yup.string()
      .required("Họ tên là bắt buộc")
      .matches(/^[a-zA-Z\sÀ-ỹ]+$/, "Họ tên chỉ chứa chữ cái"),
    NGAYSINH: Yup.date()
      .required("Ngày sinh là bắt buộc")
      .test("checkAge", "Ngày sinh phải nhỏ hơn ngày hiện tại", (value) => {
        var today = new Date();
        return value < today;
      }),
    SDT: Yup.string()
      .required("Số điện thoại là bắt buộc")
      .matches(/^\S+$/, "Không được chứa khoảng trống")
      .matches(/^\d+$/, "Số điện thoại chỉ chứa số")
      .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số"),
    DIACHI: Yup.string().required("Địa chỉ là bắt buộc"),
    ...(isEdit
      ? {}
      : {
          USERNAME: Yup.string().required("Tên đăng nhập là bắt buộc"),
        }),
  });
  const defaultValues = useMemo(() => {
    const baseValues = {
      MANHANVIEN: currentStaff?.MANHANVIEN || "",
      HOTEN: currentStaff?.HOTEN || "",
      SDT: currentStaff?.SDT || "",
      DIACHI: currentStaff?.DIACHI || "",
      NGAYSINH: dayjs(currentStaff?.NGAYSINH) || dayjs(new Date()),
    };

    if (!isEdit) {
      return {
        ...baseValues,
        USERNAME: "",
      };
    }

    return baseValues;
  }, [currentStaff, isEdit]);

  const methods = useForm({
    resolver: yupResolver(StaffSchema),
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
    if (isEdit && currentStaff) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentStaff]);

  const onSubmit = async (account: any) => {
    try {
      if (isEdit) {
        account = { ...account, IDNHANVIEN: currentStaff?.IDNHANVIEN };
        await dispatch(updateStaff(account));
      } else {
        await dispatch(createStaff(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createStaffSuccess || updateStaffSuccess) {
      navigate(PATH_DASHBOARD.staff.list);
    }
    return () => {
      dispatch(resetStaff());
    };
  }, [createStaffSuccess, updateStaffSuccess]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6} sx={{ paddingTop: "0px !important" }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <RHFTextField fullWidth name="HOTEN" label="Họ tên " />
              {!isEdit && (
                <>
                  {" "}
                  <RHFTextField name="USERNAME" label="Tên đăng nhập" />
                </>
              )}
              <RHFTextField
                fullWidth
                name="MANHANVIEN"
                label="Mã nhân viên"
                InputProps={{
                  readOnly: isEdit ? true : false,
                }}
              />
              <RHFTextField
                name="DIACHI"
                label="Địa chỉ"
                sx={{ gridColumn: { sm: "1 / 3" } }}
              />
              <RHFDatePickerField
                name="NGAYSINH"
                views={["year", "month", "day"]}
                label="Ngày sinh"
                disableFuture
                format="yyyy/dd/MM"
              />

              <RHFTextField name="SDT" label="Số điện thoại" />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Lưu thay đổi
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={6}>
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
              {!isEdit && (
                <>
                  {" "}
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
                                showPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
              <RHFDatePickerField
                name="NGAYSINH"
                views={["year", "month", "day"]}
                label="Ngày sinh"
                disableFuture
                format="yyyy/dd/MM"
              />

              <RHFTextField name="SDT" label="Số điện thoại" />
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
        </Grid> */}
      </Grid>
    </FormProvider>
  );
}
