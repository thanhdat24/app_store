import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// components
import { RHFTextField, FormProvider } from "../../../../components/hook-form";
import RHFDatePickerField from "../../../../components/hook-form/RHFDatePickerField";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { updateStaff } from "../../../../redux/slices/staffReducer";
import dayjs from "dayjs";
type Props = {};

export default function AccountGeneral({}: Props) {
  const { userLogin } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  const UpdateUserSchema = Yup.object().shape({
    HOTEN: Yup.string().required("Họ tên là bắt buộc"),
    SDT: Yup.string().required("Số điện thoại là bắt buộc"),
    DIACHI: Yup.string().required("Địa chỉ là bắt buộc"),
    NGAYSINH: Yup.date()
      .required("Ngày sinh là bắt buộc")
      .test("checkAge", "Ngày sinh phải nhỏ hơn ngày hiện tại", (value) => {
        var today = new Date();
        return value < today;
      }),
    USERNAME: Yup.string().required("Tên đăng nhập là bắt buộc"),
  });

  const defaultValues = {
    HOTEN: userLogin?.HOTEN || "",
    SDT: userLogin?.SDT || "",
    DIACHI: userLogin?.DIACHI || "",
    NGAYSINH: dayjs(userLogin?.NGAYSINH) || dayjs(new Date()),
    USERNAME: userLogin?.USERNAME || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      data = { ...data, IDNHANVIEN: userLogin?.IDNHANVIEN };

      console.log("data", data);
      await dispatch(updateStaff(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ px: 3, textAlign: "center", height: "100%" }}>
            <div className="absolute md:h-44 md:w-44  w-36 rounded-full left-1/2 transform bottom-[20%]  -translate-x-1/2 border-4 border-white dark:border-dark-secondary  cursor-pointer">
              <div className="relative flex-shrink-0 w-full h-full">
                <img
                  src="/images/default-male.svg"
                  alt=""
                  className="h-full w-full select-none bg-white rounded-full object-cover flex-shrink-0 filter hover:brightness-110"
                />
              </div>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="HOTEN" label="Họ tên" />
              <RHFTextField name="SDT" label="Số điện thoại" />
              <RHFTextField name="DIACHI" label="Địa chỉ" />
              <RHFDatePickerField
                name="NGAYSINH"
                views={["year", "month", "day"]}
                label="Ngày sinh"
                disableFuture
                format="yyyy/dd/MM"
              />
              <RHFTextField name="USERNAME" label="Tên đăng nhập" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
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
