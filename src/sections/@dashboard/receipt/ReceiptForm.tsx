import PropTypes from "prop-types";
import * as Yup from "yup";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
// components
import Label from "../../../components/Label";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { CustomerModel } from "../../../interfaces/CustomerModel";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  createReceipt,
  getAllReceipt,
  resetReceipt,
  updateReceipt,
  updateReceiptSuccess,
} from "../../../redux/slices/receiptReducer";
import { ReceiptModel } from "../../../interfaces/ReceiptModel";
import { DateField } from "@mui/x-date-pickers";
import { fDateTime, fMonthYear } from "../../../utils/formatTime";
type Props = {
  isEdit: boolean;
  currentCustomer: CustomerModel | undefined;
  currentReceipt: ReceiptModel | undefined;
};

export default function ReceiptForm({
  isEdit,
  currentCustomer,
  currentReceipt,
}: Props) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllReceipt());
  }, [dispatch]);

  const { billingPeriodList } = useAppSelector((state) => state.billingPeriod);
  
  const { userLogin } = useAppSelector((state) => state.admin);

  const { createReceiptSuccess, updateReceiptSuccess } = useAppSelector(
    (state) => state.receipt
  );

  const NewUserSchema = Yup.object().shape({
    // MAUSOPHIEU: Yup.string()
    //   .required("Mẫu số phiếu là bắt buộc"),
    //   .matches(/^\S+$/, "Không được chứa khoảng trống")
    //   .min(5, "Phải có ít nhất 5 ký tự"),
    IDKYTHU: Yup.string().required("Kỳ thu là bắt buộc"),
    // KYHIEU: Yup.string().required("Ký hiệu là bắt buộc"),
    NOIDUNG: Yup.string()
      .required("Nội dung là bắt buộc")
      .min(10, "Phải có ít nhất 10 ký tự"),
  });
  const defaultValues = useMemo(
    () => ({
      MAUSOPHIEU: currentReceipt?.MAUSOPHIEU || "01",
      KYHIEU: currentReceipt?.KYHIEU || "TT",
      IDKHACHHANG:
        currentReceipt?.IDKHACHHANG || currentCustomer?.IDKHACHHANG || "",
      KHACHHANG:
        currentReceipt?.KHACHHANG.HOTEN || currentCustomer?.HOTEN || "",
      IDNHANVIEN: userLogin?.IDNHANVIEN || "",
      MAKHACHHANG:
        currentReceipt?.KHACHHANG.MAKHACHHANG ||
        currentCustomer?.MAKHACHHANG ||
        "",
      CMT: currentReceipt?.KHACHHANG.CMT || currentCustomer?.CMT || "",
      DIACHI: currentReceipt?.KHACHHANG.DIACHI || currentCustomer?.DIACHI || "",
      IDKYTHU: currentReceipt?.IDKYTHU || "",
      IDTUYENTHU: currentReceipt?.KHACHHANG.IDTUYENTHU || "",
      TUYENTHU:
        currentReceipt?.KHACHHANG.TUYENTHU.TENTUYENTHU ||
        currentCustomer?.TUYENTHU?.TENTUYENTHU ||
        "",
      XAPHUONG:
        currentCustomer?.TUYENTHU?.XAPHUONG.TENXAPHUONG ||
        currentReceipt?.KHACHHANG.TUYENTHU.XAPHUONG.TENXAPHUONG ||
        "",
      QUANHUYEN:
        currentCustomer?.TUYENTHU?.XAPHUONG.QUANHUYEN.TENQUANHUYEN ||
        currentReceipt?.KHACHHANG.TUYENTHU.XAPHUONG.QUANHUYEN.TENQUANHUYEN ||
        "",
      NGAYTAO:
        dayjs(currentReceipt?.NGAYTAO).add(7, "hour") || dayjs(new Date()),
      NOIDUNG: currentReceipt?.CHITIETPHIEUTHUs[0]?.NOIDUNG || "",
      GIA:
        currentReceipt?.CHITIETPHIEUTHUs[0]?.SOTIEN ||
        currentCustomer?.LOAIKH.GIA ||
        "",
      TRANGTHAIPHIEU: currentReceipt?.TRANGTHAIPHIEU || "",
      TRANGTHAIHUY: currentReceipt?.TRANGTHAIHUY || "",
      NGAYCAPNHAT: dayjs(currentReceipt?.NGAYCAPNHAT) || dayjs(new Date()),
      NGUOICAPNHAT: userLogin?.HOTEN || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCustomer, currentReceipt]
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
    if (isEdit && currentReceipt) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentReceipt]);

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        data = {
          ...data,
          IDPHIEU: currentReceipt?.IDPHIEU,
          CHITIETPHIEUTHUs: [
            {
              NOIDUNG: data.NOIDUNG,
              SOTIEN: data.GIA,
            },
          ],
        };
        await dispatch(updateReceipt(data));
      } else {
        const convertedData: any = {
          IDKHACHHANG: Number(data.IDKHACHHANG),
          IDNHANVIEN: Number(data.IDNHANVIEN),
          MAUSOPHIEU: data.MAUSOPHIEU,
          KYHIEU: data.KYHIEU,
          IDKYTHU: Number(data.IDKYTHU),
          TRANGTHAIPHIEU: false,
          TRANGTHAIHUY: false,
          NGAYTAO: data.NGAYTAO,
          // NGAYTAO: fDateTime(data.NGAYTAO),
          CHITIETPHIEUTHUs: [
            {
              NOIDUNG: data.NOIDUNG,
              SOTIEN: data.GIA,
            },
          ],
        };
        console.log("convertedData", convertedData);
        await dispatch(createReceipt(convertedData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createReceiptSuccess || updateReceiptSuccess) {
      navigate(PATH_DASHBOARD.receipt.list);
    }
    return () => {
      dispatch(resetReceipt());
    };
  }, [createReceiptSuccess, updateReceiptSuccess]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <div className="mb-6 text-lg font-semibold text-blue-600 uppercase">
              Thông tin khách hàng
              <Label
                variant={"ghost"}
                color={
                  (currentCustomer?.LOAIKH.TENLOAI === "Hộ Dân" && "success") ||
                  (currentCustomer?.LOAIKH.TENLOAI === "Doanh Nghiệp" &&
                    "error") ||
                  "default"
                }
                sx={{ textTransform: "uppercase", mb: 1, marginLeft: 1 }}
              >
                {currentCustomer?.LOAIKH.TENLOAI}
              </Label>
            </div>
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
              <RHFTextField
                name="KHACHHANG"
                label="Họ tên"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="MAKHACHHANG"
                label="Mã khách hàng"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="CMT"
                label="Chứng minh thư"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="DIACHI"
                label="Địa chỉ"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="GIA"
                label="Giá loại khách hàng"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="TUYENTHU"
                label="Tuyến thu"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="QUANHUYEN"
                label="Quận huyện"
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                name="XAPHUONG"
                label="Xã phường"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <div className="mb-6 text-lg font-semibold text-blue-600 uppercase">
              Thông tin phiếu thu
            </div>
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
              <RHFTextField name="MAUSOPHIEU" label="Mẫu số phiếu" disabled />
              <RHFTextField name="KYHIEU" label="Ký hiệu" disabled />
              <RHFTextField
                name="NOIDUNG"
                label="Nội dung"
                sx={{ gridColumn: { sm: "1 / 3" } }}
              />
              <RHFSelect
                name="IDKYTHU"
                label="Kỳ thu"
                placeholder="Kỳ thu"
                disabled={isEdit ? true : false}
              >
                <option></option>
                {billingPeriodList
                  ?.filter((option) => option.TRANGTHAIKYTHU === true)
                  ?.map((option, index) => (
                    <Fragment key={index}>
                      <option value={option.IDKYTHU}>
                        {fMonthYear(option.TENKYTHU)}
                      </option>
                    </Fragment>
                  ))}
              </RHFSelect>
              <Controller
                name="NGAYTAO"
                control={control}
                render={({ field }) => (
                  <DateField
                    label="Ngày tạo phiếu"
                    value={field.value}
                    onChange={field.onChange}
                    readOnly
                  />
                )}
              />
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
