import PropTypes from "prop-types";
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
import { StaffModel } from "../../../interfaces/StaffModel";

// components

// ----------------------------------------------------------------------

interface RevenueRoutesTableToolbarProps {
  filterName: string;
  onFilterName: (value: string) => void;
  filterUser: string;
  onFilterUser: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  optionsInfo: string[];
  optionRevenueRoute: any[]; ///CSV
  optionStaffList: StaffModel[] | null;
}

export default function RevenueRoutesTableToolbar({
  filterName,
  filterUser,
  onFilterName,
  onFilterUser,
  optionsInfo,
  optionRevenueRoute,
  optionStaffList,
}: RevenueRoutesTableToolbarProps) {
  return (
    <Stack sx={{ py: 2 }}>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ pb: 2.5, px: 3 }}
      >
        {" "}
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
            maxWidth: { md: 800 },
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
        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder={
            filterUser === "Thông tin tuyến thu"
              ? "Tìm kiếm theo tên tuyến thu"
              : filterUser === "Mã tuyến thu"
              ? "Tìm kiếm theo mã tuyến thu"
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
          sx={{ width: 1200 }}
          name="TUYENTHU"
          options={Array.from(
            new Set(optionRevenueRoute?.map((option) => option.TENTUYENTHU))
          )}
          label="Tuyến thu"
        />

        <RHFSelectMultiple
          sx={{ width: 1200 }}
          name="NHANVIENTHU"
          options={
            optionStaffList
              ?.filter((option) => option.HOTEN !== "Admin")
              ?.map((option) => option.HOTEN) || []
          }
          label="Nhân viên thu"
        />
      </Stack>
    </Stack>
  );
}
