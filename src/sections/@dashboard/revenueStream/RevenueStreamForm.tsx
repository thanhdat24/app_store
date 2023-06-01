import * as Yup from "yup";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Switch, Typography } from "@mui/material";
// components
import Label from "../../../components/Label";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import RHFSelect from "../../../components/hook-form/RHFSelect";

type Props = {
  isEdit: boolean;
};

export default function RevenueStreamForm({ isEdit }: Props) {
  const NewUserSchema = Yup.object().shape({
    MATUYENTHU: Yup.string().required("Mã tuyến thu là bắt buộc"),
    TENTUYENTHU: Yup.string().required("Tên tuyến thu là bắt buộc"),
    QUANHUYEN: Yup.string().required("Quận huyện là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      MATUYENTHU: "",
      TENTUYENTHU: "",
      photoURL: "",
      QUANHUYEN: "",
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
              <RHFTextField name="MATUYENTHU" label="Mã tuyến thu" />
              <RHFTextField name="TENTUYENTHU" label="Tên tuyến thu" />
            </Box>
            <RHFSelect
              sx={{
                mt: 2,
              }}
              name="QUANHUYEN"
              label="Quận huyện"
              placeholder="Quyện huyện"
            >
              {/* <option value="" />
                {["Nam", "Nữ"].map((option, index) => (
                  <option value={option}>{option}</option>
                ))} */}
            </RHFSelect>
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
