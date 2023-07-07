import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Stack, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, RHFTextField } from "../../../../components/hook-form";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { updatePassword } from "../../../../redux/slices/adminReducer";

interface FormData {
  PASSWORD2: string;
  PASSWORD: string;
  IDNHANVIEN: number;
  MANHANVIEN: string;
  HOTEN: string;
  DIACHI: string;
  SDT: number;
  USERNAME: string;
  confirmNewPassword: any;
}

export default function AccountChangePassword() {
  const { userLogin } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  const ChangePassWordSchema = Yup.object().shape({
    PASSWORD2: Yup.string().required("Mật khẩu cũ là bắt buộc"),
    PASSWORD: Yup.string()
      .min(8, "Mật khẩu phải ít nhất 8 ký tự")
      .matches(/^\S*$/, "Mật khẩu không được chứa khoảng trắng")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Mật khẩu phải có ít nhất một chữ cái hoa, một chữ cái thường, một số và một ký tự đặc biệt"
      )
      .required("New Password is required"),
    confirmNewPassword: Yup.mixed()
      .oneOf([Yup.ref("PASSWORD")], "Mật khẩu phải trùng khớp")
      .nullable()
      .required("Nhập lại mật khẩu là bắt buộc"),
  });

  const defaultValues: FormData = {
    PASSWORD2: "",
    PASSWORD: "",
    IDNHANVIEN: userLogin?.IDNHANVIEN || 0,
    MANHANVIEN: userLogin?.MANHANVIEN || "",
    HOTEN: userLogin?.HOTEN || "",
    DIACHI: userLogin?.DIACHI || "",
    SDT: userLogin?.SDT || 0,
    USERNAME: userLogin?.USERNAME || "",
    confirmNewPassword: "",
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
      console.log("data", data);
      dispatch(updatePassword(data));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3, width: "55%", margin: "0 auto" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="PASSWORD2" type="password" label="Mật khẩu cũ" />

          <RHFTextField name="PASSWORD" type="password" label="Mật khẩu mới" />

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
