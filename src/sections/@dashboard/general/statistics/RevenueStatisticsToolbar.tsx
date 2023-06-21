import { Box, Stack, TextField } from "@mui/material";
import RHFSelectMultiple from "../../../../components/hook-form/RHFSelectMultiple";
import RHFDatePickerField from "../../../../components/hook-form/RHFDatePickerField";
import { RevenueRoutesModel } from "../../../../interfaces/RevenueRoutesModel";
import RHFSelect from "../../../../components/hook-form/RHFSelect";
import { parseWithOptions } from "date-fns/fp";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { RHFTextField } from "../../../../components/hook-form";
// components

// ----------------------------------------------------------------------

interface RevenueStatisticsToolbarProps {
  optionRevenueRoute: RevenueRoutesModel[] | null;
  optionStaff: string[] | null;
  values: any;
  setValue: any;
}

export default function RevenueStatisticsToolbar({
  optionRevenueRoute,
  optionStaff,
  values,
  setValue,
}: RevenueStatisticsToolbarProps) {
  const [data, setData] = useState({
    setQUANHUYEN: "",
    setXAPHUONG: "",
    setIDQUANHUYEN: "",
    setIDXAPHUONG: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        if (values.TUYENTHUTK) {
          const response = await axios.get(
            `api/TUYENTHUs/${JSON.parse(values.TUYENTHUTK).idtuyenthu}`
          );
          setData({
            ...data,
            setIDQUANHUYEN: response.data.XAPHUONG.QUANHUYEN.IDQUANHUYEN,
            setQUANHUYEN: response.data.XAPHUONG.QUANHUYEN.TENQUANHUYEN,
            setXAPHUONG: response.data.XAPHUONG.TENXAPHUONG,
            setIDXAPHUONG: response.data.XAPHUONG.IDXAPHUONG,
          });
          setValue(
            "QUANHUYEN",
            JSON.stringify({
              IDQUANHUYEN: response.data.XAPHUONG.QUANHUYEN.IDQUANHUYEN,
              TENQUANHUYEN: response.data.XAPHUONG.QUANHUYEN.TENQUANHUYEN,
            })
          );
          setValue(
            "XAPHUONG",
            JSON.stringify({
              IDXAPHUONG: response.data.XAPHUONG.IDXAPHUONG,
              TENXAPHUONG: response.data.XAPHUONG.TENXAPHUONG,
            })
          );
        } else {
          setData({ ...data, setQUANHUYEN: "", setXAPHUONG: "" });
          setValue("QUANHUYEN", "");
          setValue("XAPHUONG", "");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [values.TUYENTHUTK]);

  console.log("values123", values);
  return (
    <Stack>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ py: 2.5, px: 3 }}
      >
        <RHFDatePickerField
          sx={{ width: "100%" }}
          label="Kỳ thu"
          views={["month", "year"]}
          format="MMMM YYYY"
          name="KYTHU"
        />
        <RHFDatePickerField
          sx={{ width: "100%" }}
          name="NGAYTHUBATDAU"
          label="Ngày thu bắt đầu"
          defaultCalendarMonth={values.KYTHU}
        />
        <RHFDatePickerField
          sx={{ width: "100%" }}
          shouldDisableDate={(date: Date) => {
            const disableDate = new Date(values.NGAYTHUBATDAU); // Ngày 19/5/2023
            return date < disableDate;
          }}
          name="NGAYTHUKETTHUC"
          label="Ngày thu kết thúc"
          defaultCalendarMonth={values.KYTHU}
        />
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ py: 0, px: 3 }}
      >
        <RHFSelect name="TUYENTHUTK" label="Tuyến thu" placeholder="Tuyến thu">
          <option value="Chọn tuyến thu" label="Chọn tuyến thu" />
          {optionRevenueRoute?.map((option: any, index) => (
            <option
              key={option.IDTUYENTHU}
              value={JSON.stringify({
                idtuyenthu: option.IDTUYENTHU,
                tentuyenthu: option.TENTUYENTHU,
              })}
            >
              {option.TENTUYENTHU}
            </option>
          ))}
        </RHFSelect>
        <RHFTextField
          name="QUANHUYEN"
          label="Quận huyện"
          value={data.setQUANHUYEN}
          placeholder="Quận huyện"
        />
        <RHFTextField
          name="XAPHUONG"
          label="Xã phường"
          value={data.setXAPHUONG}
          placeholder="Xã phường"
        />
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ py: 2.5, px: 3 }}
      ></Stack>
    </Stack>
  );
}
