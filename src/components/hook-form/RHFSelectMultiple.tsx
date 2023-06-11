import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface RHFSelectProps {
  name: string;
  label?: string;
  options: any[];
  sx?: any;
}

const RHFSelectMultiple: React.FC<RHFSelectProps> = ({
  name,
  label,
  options,
  sx,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <>
          {/* <p>{value}</p> */}
          <FormControl sx={sx}>
            <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={Array.isArray(value) ? value : []}
              onChange={onChange}
              onBlur={onBlur}
              input={<OutlinedInput label="Tuyến thu" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {options.length > 0 &&
                options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={value?.includes(option)} />{" "}
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}
    />
  );
};

export default RHFSelectMultiple;
