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
import { BillingPeriodModel } from "../../../interfaces/BillingPeriodModel";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  createBillingPeriod,
  resetBillingPeriod,
  updateBillingPeriod,
} from "../../../redux/slices/billingPeriodReducer";
import { PATH_DASHBOARD } from "../../../routes/paths";
import RHFDatePickerField from "../../../components/hook-form/RHFDatePickerField";

type Props = {
  isEdit: boolean;
  currentBillingPeriod: BillingPeriodModel | undefined;
};

export default function BillingPeriodForm({
  isEdit,
  currentBillingPeriod,
}: Props) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    createBillingPeriodSuccess,
    updateBillingPeriodSuccess,
    billingPeriodList,
  } = useAppSelector((state) => state.billingPeriod);

  const BillingPeriodSchema = Yup.object().shape({
    TENKYTHU: Yup.string().required("Tên kỳ thu là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      TENKYTHU: currentBillingPeriod?.TENKYTHU || "",
    }),
    [currentBillingPeriod]
  );

  const methods = useForm({
    resolver: yupResolver(BillingPeriodSchema),
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
    if (isEdit && currentBillingPeriod) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentBillingPeriod]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      if (isEdit) {
        account = { ...account, IDKYTHU: currentBillingPeriod?.IDKYTHU };
        await dispatch(updateBillingPeriod(account));
      } else {
        await dispatch(createBillingPeriod(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createBillingPeriodSuccess || updateBillingPeriodSuccess) {
      navigate(PATH_DASHBOARD.billingPeriod.list);
    }
    return () => {
      dispatch(resetBillingPeriod());
    };
  }, [createBillingPeriodSuccess, updateBillingPeriodSuccess]);

  const shouldDisableDate = (date: Dayjs) => {
    const selectedMonth = date.month();
    const selectedYear = date.year();

    return billingPeriodList?.some((item) => {
      const itemMonth = dayjs(item.TENKYTHU, "MMMM YYYY").month();
      const itemYear = dayjs(item.TENKYTHU, "MMMM YYYY").year();

      return itemMonth === selectedMonth && itemYear === selectedYear;
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} justifyContent="center" alignItems="center" >
        <Grid item xs={9} md={9}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                columnGap: 2,
                rowGap: 3,
              }}
            >
              <RHFDatePickerField
                disablePast
                shouldDisableMonth={shouldDisableDate}
                name="TENKYTHU"
                label="Kỳ thu"
                views={["month", "year"]}
                format="MMMM YYYY"
              />
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
