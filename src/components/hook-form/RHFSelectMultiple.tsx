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
  Select,
  TextField,
} from "@mui/material";

// ----------------------------------------------------------------------

interface RHFSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  children: React.ReactNode | any;
}

const RHFSelectMultiple: React.FC<RHFSelectProps> = ({
  name,
  label,
  placeholder,
  children,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { error },
      }) => (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            id={`${name}-select`}
            multiple
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            input={<TextField label={label} />}
            renderValue={(selected) => selected.join(", ")}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  );
};

RHFSelectMultiple.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default RHFSelectMultiple;
