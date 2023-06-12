import PropTypes from "prop-types";
import { Stack, InputAdornment, TextField, MenuItem, Box, Tooltip, IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { CSVLink, CSVDownload } from "react-csv";


// components

// ----------------------------------------------------------------------

const INPUT_WIDTH = 250;

interface WardsTableToolbarProps {
  filterName: string;
  onFilterName: (value: string) => void;
  filterUser: string;
  onFilterUser: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  optionsInfo: string[];
  dataTable: any[]; ///CSV
}

export default function WardsTableToolbar({
  filterName,
  filterUser,
  onFilterName,
  onFilterUser,
  optionsInfo,
  dataTable, ///CSV
}: WardsTableToolbarProps) {
  return (
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
          maxWidth: { md: INPUT_WIDTH },
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
          filterUser === "Tên xã phường"
            ? "Tìm kiếm theo tên xã phường"
            : filterUser === "Tên quận huyện"
            ? "Tìm kiếm theo tên quận huyện"
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
  );
}
