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
import { DistrictModel } from "../../../interfaces/DistrictModel";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createDistrict, resetDistrict, updateDistrict } from "../../../redux/slices/districtReducer";
import { PATH_DASHBOARD } from "../../../routes/paths";

type Props = {
  isEdit: boolean;
  currentDistrict: DistrictModel | undefined;
};

export default function DistrictForm({ isEdit, currentDistrict }: Props) {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { createDistrictSuccess, updateDistrictSuccess } =
    useAppSelector((state) => state.district);
    
  const DistrictSchema = Yup.object().shape({
    TENQUANHUYEN: Yup.string().required("Quận huyện là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      TENQUANHUYEN: currentDistrict?.TENQUANHUYEN || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDistrict]
  );

  const methods = useForm({
    resolver: yupResolver(DistrictSchema),
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
    if (isEdit && currentDistrict) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentDistrict]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      if (isEdit) {
        account = { ...account, IDQUANHUYEN: currentDistrict?.IDQUANHUYEN };
        await dispatch(updateDistrict(account));
      } else {
        await dispatch(createDistrict(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createDistrictSuccess || updateDistrictSuccess) {
      navigate(PATH_DASHBOARD.district.list);
    }
    return () => {
      dispatch(resetDistrict());
    };
  }, [createDistrictSuccess, updateDistrictSuccess]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  // sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="TENQUANHUYEN" label="Tên quận huyện" />
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
