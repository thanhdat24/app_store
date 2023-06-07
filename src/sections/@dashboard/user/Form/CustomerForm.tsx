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
} from "@mui/material";
// components
import Label from "../../../../components/Label";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../../components/hook-form";
import RHFSelect from "../../../../components/hook-form/RHFSelect";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store";
import axios from "../../../../utils/axios";
import { getAllCustomerTypes } from "../../../../redux/slices/customerTypeReducer";
import {
  createCustomer,
  resetCustomer,
} from "../../../../redux/slices/customerReducer";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { getAllRevenueRoutes } from "../../../../redux/slices/revenueRoutesReducer";

type Props = {
  isEdit: boolean;
};

export default function CustomerForm({ isEdit }: Props) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCustomerTypes());
    dispatch(getAllRevenueRoutes());
  }, [dispatch]);

  const { revenueRoutesList } = useAppSelector(
    (state: RootState) => state.revenueRoutes
  );
  const { customerTypeList } = useAppSelector(
    (state: RootState) => state.customerType
  );
  const { createCustomerSuccess } = useAppSelector(
    (state: RootState) => state.customer
  );

  console.log("revenueRoutesList", revenueRoutesList);

  const [data, setData] = useState({
    setWard: "",
    setDistrict: "",
    setIDXAPHUONG: "",
  });

  const handleSelectrevenueRoutes = async (selectedValue: number) => {
    console.log("selectedValue", selectedValue);
    try {
      const response = await axios.get(`api/TUYENTHUs/${selectedValue}`);
      console.log("Route details:", response.data);
      setData({
        ...data,
        setDistrict: response.data.XAPHUONG.QUANHUYEN.TENQUANHUYEN,
        setWard: response.data.XAPHUONG.TENXAPHUONG,
        setIDXAPHUONG: response.data.XAPHUONG.IDXAPHUONG,
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("data", data);

  const NewUserSchema = Yup.object().shape({
    MAKHACHHANG: Yup.string()
      .required("Mã khách hàng là bắt buộc")
      .matches(/^\S+$/, "Không được chứa khoảng trống")
      .min(5, "Phải có ít nhất 5 ký tự"),
    HOTEN: Yup.string()
      .required("Họ tên là bắt buộc")
      .matches(/^[a-zA-Z\sÀ-ỹ]+$/, "Họ tên chỉ chứa chữ cái"),
    DIACHI: Yup.string().required("Địa chỉ là bắt buộc"),
    NGAYCAP: Yup.date()
      .required("Ngày cấp là bắt buộc")
      .test("checkAge", "Ngày cấp phải nhỏ hơn ngày hiện tại", (value) => {
        var today = new Date();
        return value < today;
      }),
    CMT: Yup.string()
      .required("Chứng minh thư là bắt buộc")
      .matches(/^\S+$/, "Không được chứa khoảng trống")
      .matches(/^\d+$/, "Chứng minh thư chỉ chứa số")
      .matches(/^[0-9]{12}$/, "Chứng minh thư gồm 12 số"),
    IDTUYENTHU: Yup.string().required("Phiếu thu là bắt buộc"),
    // QUANHUYEN: Yup.string().required("Quận huyện là bắt buộc"),
    // PHUONGXA: Yup.string().required("Phường xã là bắt buộc"),
    IDLOAIKH: Yup.string().required("Loại khách hàng là bắt buộc"),
  });
  
  const defaultValues = useMemo(
    () => ({
      MAKHACHHANG: "",
      HOTEN: "",
      DIACHI: "",
      NGAYCAP: dayjs(new Date()),
      CMT: "",
      IDTUYENTHU: "",
      // NGAYSINH: dayjs("2022-04-17"),
      PHUONGXA: "",
      IDLOAIKH: "",
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
      const convertedAccount = {
        ...account,
        IDTUYENTHU: Number(account.IDTUYENTHU),
        IDXAPHUONG: Number(data.setIDXAPHUONG),
        IDLOAIKH: Number(account.IDLOAIKH),
        NGAYCAP: dayjs(account.NGAYCAP).format("DD-MM-YYYY"),
      };
      console.log(convertedAccount);
      await dispatch(createCustomer(convertedAccount));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createCustomerSuccess) {
      navigate(PATH_DASHBOARD.user.list);
    }
    return () => {
      dispatch(resetCustomer());
    };
  }, [createCustomerSuccess]);

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
              <RHFTextField name="MAKHACHHANG" label="Mã nhân viên" />
              <RHFTextField name="HOTEN" label="Họ tên " />

              <RHFSelect
                name="IDTUYENTHU"
                label="Tuyến thu"
                placeholder="Tuyến thu"
                onChange={handleSelectrevenueRoutes}
              >
                <option value="" />
                {revenueRoutesList?.map((option, index) => (
                  <option key={option.IDTUYENTHU} value={option.IDTUYENTHU}>
                    {option.TENTUYENTHU}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField
                name="QUANHUYEN"
                label="Quận huyện"
                value={data.setDistrict}
                disabled
              />

              <RHFTextField
                name="PHUONGXA"
                label="Phường xã"
                value={data.setWard}
                disabled
              />
              {/* <Controller
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
              /> */}
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
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="CMT" label="Chứng minh thư" />
              <Controller
                name="NGAYCAP"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Ngày cấp"
                    defaultValue={dayjs("2022-04-17")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <RHFTextField
                name="DIACHI"
                label="Địa chỉ"
                // sx={{ gridColumn: { sm: "1 / 3" } }}
              />

              <RHFSelect
                name="IDLOAIKH"
                label="Loại khách hàng"
                placeholder="Loại khách hàng"
              >
                <option value="" />
                {customerTypeList?.map((option, index) => (
                  <option key={option.IDLOAIKH} value={option.IDLOAIKH}>
                    {option.TENLOAI}
                  </option>
                ))}
              </RHFSelect>
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
