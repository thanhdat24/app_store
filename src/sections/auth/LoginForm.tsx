import * as Yup from "yup";
import { useState } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// mui
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../components/Iconify";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { login } from "../../redux/slices/adminReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";

type Props = {};

export default function LoginForm({}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const { errorLogin } = useAppSelector((state) => state.admin);
  const LoginSchema = Yup.object().shape({
    USERNAME: Yup.string().required("Tài khoản là bắt buộc"),
    PASSWORD: Yup.string().required("Password là bắt buộc"),
  });

  const defaultValues = {
    USERNAME: "",
    PASSWORD: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  <s></s>;
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await dispatch(login(data));
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {errorLogin && (
        <span className="bg-red-500 rounded-md text-white text-base mb-6 py-2 text-center flex justify-center ">
          {errorLogin}
        </span>
      )}

      <Stack spacing={3}>
        <RHFTextField
          // color="secondary"
          sx={{
            backgroundColor: "#262c49 !important",
            "& label.Mui-focused": {
              color: "#7367f0",
            },
            "& label": {
              color: "#c2c6dc",
              fontSize: "16px",
            },
            "& .MuiInputBase-input": {
              color: "#c2c6dc",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#262c49",
              },
              "&:hover fieldset": {
                borderColor: "#7367f0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#7367f0",
              },
            },
          }}
          name="USERNAME"
          label="Tài khoản"
        />

        <RHFTextField
          name="PASSWORD"
          label="Mật khẩu"
          sx={{
            backgroundColor: "#262c49 !important",
            "& label.Mui-focused": {
              color: "#7367f0",
            },
            "& label": {
              color: "#c2c6dc",
              fontSize: "16px",
            },
            "& .MuiInputBase-input": {
              color: "#c2c6dc",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#262c49",
              },
              "&:hover fieldset": {
                borderColor: "#7367f0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#7367f0",
              },
            },
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    sx={{ color: "#c2c6dc" }}
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        sx={{
          my: 3,
          backgroundColor: "#7367f0 !important",
          fontSize: "15px",
          "&:hover": {
            borderColor: "#5e50ee!important",
            boxShadow: "0 8px 25px -8px #7367f0",
          },
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
