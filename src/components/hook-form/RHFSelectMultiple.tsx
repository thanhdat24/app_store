// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Autocomplete, Checkbox, TextField } from "@mui/material";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// ----------------------------------------------------------------------



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
}) => {
  const { control } = useFormContext();
  // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  // const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => (
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
          renderOption={(props, option) => (
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
