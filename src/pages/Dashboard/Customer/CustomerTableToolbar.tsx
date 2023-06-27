import PropTypes from "prop-types";
// form
import { useForm } from "react-hook-form";
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
import { CSVLink } from "react-csv";
import { CustomerModel } from "../../../interfaces/CustomerModel";
import { FormProvider } from "../../../components/hook-form";
import RHFSelectMultiple from "../../../components/hook-form/RHFSelectMultiple";
import { CashierModel } from "../../../interfaces/CashierModel";
// components

// ----------------------------------------------------------------------

interface CustomerTableToolbarProps {
  filterName: string;
  onFilterName: (value: string) => void;
  filterUser: string;
  onFilterUser: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  optionsInfo: string[];
  dataTable: any[];
  optionRevenueRoute: CustomerModel[] | CashierModel[] | undefined;
}

export default function CustomerTableToolbar({
  filterName,
  filterUser,
  onFilterName,
  onFilterUser,
  optionsInfo,
  dataTable,
  // filterRevenueRoute,
  // onFilterRevenueRoute,
  optionRevenueRoute,
}: CustomerTableToolbarProps) {
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
            maxWidth: { md: 265 },
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
        {/* <FormProvider methods={methods}> */}

        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder={
            filterUser === "Thông tin khách hàng"
              ? "Tìm kiếm theo tên hoặc CMT"
              : filterUser === "Mã khách hàng"
              ? "Tìm kiếm theo mã khách hàng"
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
        <RHFSelectMultiple
          sx={{ width: 300 }}
          name="TRANGTHAI"
          options={["Hoạt động", "Khoá"]}
          label="Trạng thái"
          placeholder="Chọn trạng thái"
        />
        <RHFSelectMultiple
          sx={{ width: 1000 }}
          name="TUYENTHU"
          options={Array.from(
            new Set(
              optionRevenueRoute?.map((option) => option.TUYENTHU.TENTUYENTHU)
            )
          )}
          label="Tuyến thu"
          placeholder="Chọn tuyến thu"
        />
      </Stack>
    </Stack>
  );
}
