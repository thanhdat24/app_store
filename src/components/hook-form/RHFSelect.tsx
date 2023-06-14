import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

interface RHFSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  children: React.ReactNode;
  sx?: any;
  [key: string]: any;
  onChange?: (event: number) => void;
}

const RHFSelect: React.FC<RHFSelectProps> = ({
  name,
  label,
  placeholder,
  children,
  sx,
  onChange,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          label={label}
          placeholder={placeholder}
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          sx={sx}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (typeof onChange === "function") {
              onChange(Number(e.target.value));
            }
          }}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
};

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default RHFSelect;
