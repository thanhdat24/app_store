import PropTypes from "prop-types";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid } from "@mui/material";
// components
import { FormProvider, RHFTextField } from "../../../components/hook-form";

type Props = {
  isEdit: boolean;
};

export default function PermissionForm({ isEdit }: Props) {
  const NewUserSchema = Yup.object().shape({
    QUYEN: Yup.string().required("Quyền là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
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
        <Grid item xs={6} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 1,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  // sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="QUYEN" label="Tên quyền" />
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
