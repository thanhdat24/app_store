import {
  Stack,
  InputAdornment,
  TextField,
  MenuItem,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import Iconify from "../../../components/Iconify";
import { CSVLink, CSVDownload } from "react-csv";
import RHFSelectMultiple from "../../../components/hook-form/RHFSelectMultiple";
import { ReceiptModel } from "../../../interfaces/ReceiptModel";
import { CustomerModel } from "../../../interfaces/CustomerModel";
import RHFDatePickerField from "../../../components/hook-form/RHFDatePickerField";
// components

// ----------------------------------------------------------------------

interface ReceiptTableToolbarProps {
  filterName: string;
  onFilterName: (value: string) => void;
  filterUser: string;
  onFilterUser: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  optionsInfo: string[];
  dataTable: any[];
  optionRevenueRoute: ReceiptModel[] | CustomerModel[] | undefined;
}

export default function ReceiptTableToolbar({
  filterName,
  filterUser,
  onFilterName,
  onFilterUser,
  optionsInfo,
  dataTable,
  optionRevenueRoute,
}: ReceiptTableToolbarProps) {
  return (
    <Stack>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ py: 2.5, px: 3 }}
      >
        <TextField
          fullWidth
          select
          label="Lọc"
          value={filterUser}
          onChange={onFilterUser}
          SelectProps={{
            MenuProps: {
              sx: { "& .MuiPaper-root": { maxHeight: 260 } },
            },
          }}
          sx={{
            maxWidth: { md: 220 },
            textTransform: "capitalize",
          }}
        >
          {optionsInfo.map((option: any) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: "body2",
                textTransform: "capitalize",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>

        <RHFSelectMultiple
          sx={{ width: 1000 }}
          name="TUYENTHU"
          options={Array.from(
            new Set(
              optionRevenueRoute?.map(
                (option) => option.KHACHHANG.TUYENTHU.TENTUYENTHU
              )
            )
          )}
          label="Tuyến thu"
        />

        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder={
            filterUser === "Thông tin khách hàng"
              ? "Tìm kiếm theo tên, mã hoặc CMT"
              : filterUser === "Mã số phiếu"
              ? "Tìm kiếm theo mã số phiếu"
              : undefined
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ pb: 2.5, px: 3 }}
      >
        <RHFDatePickerField
          sx={{ width: 220 }}
          name="KYTHUBATDAU"
          label="Kỳ thu bắt đầu"
          views={["month", "year"]}
          format="MMMM YYYY"
        />

        <RHFDatePickerField
          sx={{ width: 190 }}
          name="KYTHUKETTHUC"
          label="Kỳ thu kết thúc"
          views={["month", "year"]}
          format="MMMM YYYY"
        />
      </Stack>
    </Stack>
  );
}
