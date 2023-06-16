import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Stack, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, RHFTextField } from "../../../../components/hook-form";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string | null;
}

export default function AccountChangePassword() {
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Mật khẩu cũ là bắt buộc"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu phải ít nhất 6 kí tự")
      .required("New Password is required"),
    confirmNewPassword: Yup.mixed()
      .oneOf([Yup.ref("newPassword")], "Mật khẩu phải trùng khớp")
      .nullable()
      .required("Confirm New Password is required"),
  });

  const defaultValues: FormData = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: null,
  };

  const methods = useForm<FormData>({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      // enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3, width: "55%", margin: "0 auto" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField
            name="oldPassword"
            type="password"
            label="Mật khẩu cũ"
          />

          <RHFTextField
            name="newPassword"
            type="password"
            label="Mật khẩu mới"
          />

          <RHFTextField
            name="confirmNewPassword"
            type="password"
            label="Nhập lại mật khẩu mới"
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Thay đổi
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
