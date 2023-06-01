import PropTypes from "prop-types";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";
// components
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { PermissionModel } from "../../../interfaces/PermissionModel";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { createPermission, resetPermission, updatePermission } from "../../../redux/slices/permissionReducer";
import { PATH_DASHBOARD } from "../../../routes/paths";

type Props = {
  isEdit: boolean;
  currentPermission: PermissionModel | undefined;
};

export default function PermissionForm({ isEdit, currentPermission }: Props) {
  ///
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { createPermissionSuccess, updatePermissionSuccess } =
    useAppSelector((state) => state.permission);
  ///
  const PermissionSchema = Yup.object().shape({
    TENQUYEN: Yup.string().required("Quyền là bắt buộc"),
  });

  const defaultValues = useMemo(
    () => ({
      TENQUYEN: currentPermission?.TENQUYEN || "",
    }),
    [currentPermission]
  );

  const methods = useForm({
    resolver: yupResolver(PermissionSchema),
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

  //
  useEffect(() => {
    if (isEdit && currentPermission) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPermission]);
  //

  const onSubmit = async (account: any) => {
    try {
      console.log(account);
      if (isEdit) {
        account = { ...account, IDQUYEN: currentPermission?.IDQUYEN };
        await dispatch(updatePermission(account));
      } else {
        await dispatch(createPermission(account));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (createPermissionSuccess || updatePermissionSuccess) {
      navigate(PATH_DASHBOARD.permission.list);
    }
    return () => {
      dispatch(resetPermission());
    };
  }, [createPermissionSuccess, updatePermissionSuccess]);

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
              <RHFTextField name="TENQUYEN" label="Tên quyền" />
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
