import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
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
  style?: any;
  placeholder?: string;
  sx?: any;
}

const RHFSelectMultiple: React.FC<RHFSelectProps> = ({
  name,
  label,
  options,
  style = { width: 1200 },
  placeholder,
  sx,
  ...other
}) => {
  const { control } = useFormContext();
  // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  // const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        // <>
        //   {/* <p>{value}</p> */}
        //   <FormControl sx={sx}>
        //     <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        //     <Select
        //       labelId="demo-multiple-checkbox-label"
        //       id="demo-multiple-checkbox"
        //       multiple
        //       value={Array.isArray(value) ? value : []}
        //       onChange={onChange}
        //       onBlur={onBlur}
        //       input={<OutlinedInput label="Tuyến thu" />}
        //       renderValue={(selected) => selected.join(", ")}
        //       MenuProps={MenuProps}
        //     >
        //       {options.length > 0 &&
        //         options?.map((option) => (
        //           <MenuItem key={option} value={option}>
        //             <Checkbox checked={value?.includes(option)} />{" "}
        //             <ListItemText primary={option} />
        //           </MenuItem>
        //         ))}
        //     </Select>
        //   </FormControl>
        // </>
        <Autocomplete
          sx={sx}
          multiple
          id={`${name}-autocomplete`}
          options={options}
          disableCloseOnSelect
          value={Array.isArray(value) ? value : []}
          onChange={(_, newValue) => onChange(newValue)}
          onBlur={onBlur}
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox checked={value?.includes(option)} /> {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={placeholder} />
          )}
        />
      )}
    />
  );
};

export default RHFSelectMultiple;
