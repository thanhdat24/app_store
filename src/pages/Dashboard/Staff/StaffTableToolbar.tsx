import PropTypes from "prop-types";
import { Stack, InputAdornment, TextField, MenuItem } from "@mui/material";
import Iconify from "../../../components/Iconify";
// components


// ----------------------------------------------------------------------

interface UserTableToolbarProps {
  filterName: string;
  onFilterName: (value: string) => void;
}

// UserTableToolbar.propTypes = {
//   filterName: PropTypes.string,
//   // filterRole: PropTypes.string,
//   onFilterName: PropTypes.func,
//   // onFilterRole: PropTypes.func,
//   // optionsRole: PropTypes.arrayOf(PropTypes.string),
// };

export default function StaffTableToolbar({
  filterName,
  onFilterName,
}: UserTableToolbarProps) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{ py: 2.5, px: 3 }}
    >
      {/* <TextField
        fullWidth
        select
        label="Role"
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField> */}

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Tìm kiếm người dùng..."
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
