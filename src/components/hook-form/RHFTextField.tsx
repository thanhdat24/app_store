import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

interface RHFTextFieldProps {
  name: string;
  [key: string]: any;
  sx?: any;
}

const RHFTextField: React.FC<RHFTextFieldProps> = ({ sx, name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          sx={sx}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
};

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RHFTextField;
