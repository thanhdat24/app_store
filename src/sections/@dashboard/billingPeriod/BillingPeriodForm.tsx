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

export default function BillingPeriodForm({ isEdit }: Props) {
  const NewUserSchema = Yup.object().shape({
    TENKYTHU: Yup.string().required("Mẫu số phiếu là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      TENKYTHU: dayjs(new Date()),
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
  }, [isEdit]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
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
                justifyContent: "center",
                columnGap: 2,
                rowGap: 3,
              }}
            >
              <Controller
                name="TENKYTHU"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    views={["month", "year"]}
                    label="Tên kỳ thu"
                    value={dayjs(field.value)}
                    onChange={(date) =>
                      field.onChange(dayjs(date).format("MM/YYYY"))
                    }
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
