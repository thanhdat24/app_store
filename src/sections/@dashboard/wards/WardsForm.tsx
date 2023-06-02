import PropTypes from "prop-types";
import * as Yup from "yup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
// components
import Label from "../../../components/Label";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import Iconify from "../../../components/Iconify";
import { WardModel } from "../../../interfaces/WardModel";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";
import {
  createWard,
  getAllWard,
  resetWard,
  updateWard,
} from "../../../redux/slices/wardReducer";
import {
  getAllDistricts,
  resetDistrict,
} from "../../../redux/slices/districtReducer";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { DistrictModel } from "../../../interfaces/DistrictModel";
import axios from "axios";

type Props = {
  isEdit: boolean;
  currentWard: WardModel | undefined;
};

export default function WardsForm({ isEdit, currentWard }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllDistricts());
  }, [dispatch]); 

  const { districtList } = useAppSelector((state: RootState) => state.district);
  const [data, setData] = useState({
    setDistrict: "",
  });

  const { createWardSuccess, updateWardSuccess } = useAppSelector(
    (state) => state.ward
  );

  const WardSchema = Yup.object().shape({
    TENXAPHUONG: Yup.string().required("Xã phường là bắt buộc"),
    IDQUANHUYEN: Yup.string().required("Quận huyện là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      TENXAPHUONG: currentWard?.TENXAPHUONG || "",
      IDQUANHUYEN: currentWard?.IDQUANHUYEN || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentWard]
  );

  const methods = useForm({
    resolver: yupResolver(WardSchema),
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
    if (isEdit && currentWard) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentWard]);

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      if (isEdit) {
        account = { ...account, IDXAPHUONG: currentWard?.IDXAPHUONG };
        await dispatch(updateWard(account));
      } else {
        await dispatch(createWard(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createWardSuccess || updateWardSuccess) {
      navigate(PATH_DASHBOARD.wards.list);
    }
    return () => {
      dispatch(resetWard());
    };
  }, [createWardSuccess, updateWardSuccess]);

  useEffect(() => {
    dispatch(getAllDistricts());
  }, [dispatch]);

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
              <RHFTextField name="TENXAPHUONG" label="Tên xã phường" />

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
