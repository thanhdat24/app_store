import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel } from "@mui/material";

interface RHFSwitchProps {
  name: string;
  label?: string;
  defaultChecked?: any; // Add defaultValue prop
  [key: string]: any;
}

export default function RHFSwitch({
  name,
  label,
  defaultChecked,
  ...other
}: RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          // Pass defaultValue to the Controller
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              defaultChecked={defaultChecked}
              
            />
          )}
        />
      }
      label={label}
      {...other}
    />
  );
}
