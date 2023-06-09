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
import { Box, Card, Grid, Stack, Switch, Typography } from "@mui/material";
// components
import Label from "../../../components/Label";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import Iconify from "../../../components/Iconify";
import { RevenueRoutesModel } from "../../../interfaces/RevenueRoutesModel";
import {
  createRevenueRoutes,
  resetRevenueRoutes,
  updateRevenueRoutes,
} from "../../../redux/slices/revenueRoutesReducer";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { getAllDistricts } from "../../../redux/slices/districtReducer";
import axios from "axios";
import { getAllWard } from "../../../redux/slices/wardReducer";

type Props = {
  isEdit: boolean;
  currentRevenueRoutes: RevenueRoutesModel | undefined;
};

export default function RevenueRoutesForm({
  isEdit,
  currentRevenueRoutes,
}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllDistricts());
    dispatch(getAllWard());
  }, [dispatch]);

  const { districtList } = useAppSelector((state: RootState) => state.district);
  const { wardList } = useAppSelector((state: RootState) => state.ward);

  const { createRevenueRoutesSuccess, updateRevenueRoutesSuccess } =
    useAppSelector((state) => state.revenueRoutes);

  const RevenueRoutesSchema = Yup.object().shape({
    MATUYENTHU: Yup.string()
      .required("Mã tuyến thu là bắt buộc")
      .matches(/^\S+$/, "Không được chứa khoảng trống"),
    TENTUYENTHU: Yup.string().required("Tên tuyến thu là bắt buộc"),
    IDQUANHUYEN: Yup.string().required("Quận huyện là bắt buộc"),
    IDXAPHUONG: Yup.string().required("Xã phường là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      MATUYENTHU: currentRevenueRoutes?.MATUYENTHU || "",
      TENTUYENTHU: currentRevenueRoutes?.TENTUYENTHU || "",
      IDXAPHUONG: currentRevenueRoutes?.XAPHUONG.IDXAPHUONG || "",
      IDQUANHUYEN: currentRevenueRoutes?.XAPHUONG.IDQUANHUYEN || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRevenueRoutes]
  );

  const methods = useForm({
    resolver: yupResolver(RevenueRoutesSchema),
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
    if (isEdit && currentRevenueRoutes) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRevenueRoutes]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      if (isEdit) {
        account = {
          ...account,
          IDTUYENTHU: Number(currentRevenueRoutes?.IDTUYENTHU),
        };
        await dispatch(updateRevenueRoutes(account));
      } else {
        await dispatch(createRevenueRoutes(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createRevenueRoutesSuccess || updateRevenueRoutesSuccess) {
      navigate(PATH_DASHBOARD.revenueRoutes.list);
    }
    return () => {
      dispatch(resetRevenueRoutes());
    };
  }, [createRevenueRoutesSuccess, updateRevenueRoutesSuccess]);

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
              <RHFTextField name="MATUYENTHU" label="Mã tuyến thu" />
              <RHFTextField name="TENTUYENTHU" label="Tên tuyến thu" />
              <RHFSelect
                name="IDXAPHUONG"
                label="Xã phường"
                placeholder="Xã phường"
              >
                <option value="" />
                {wardList?.map((option, index) => (
                  <option key={option.IDXAPHUONG} value={option.IDXAPHUONG}>
                    {option.TENXAPHUONG}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="IDQUANHUYEN"
                label="Quận huyện"
                placeholder="Quận huyện"
              >
                <option value="" />
                {districtList?.map((option, index) => (
                  <option key={option.IDQUANHUYEN} value={option.IDQUANHUYEN}>
                    {option.TENQUANHUYEN}
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
