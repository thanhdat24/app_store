import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { DateRangePicker, DateRange } from "@mui/lab";

interface RHFDateRangePickerProps {
  startText: string;
  endText: string;
  name: string;
  [key: string]: any;
  sx?: any;
}

const RHFDateRangePicker: React.FC<RHFDateRangePickerProps> = ({
  startText,
  endText,
  name,
  sx,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DateRangePicker
          startText={startText}
          endText={endText}
          value={value ? [new Date(value[0]), new Date(value[1])] : null}
          onChange={(newValue: DateRange<Date | null>) =>
            onChange([
              newValue[0]?.toISOString() || null,
              newValue[1]?.toISOString() || null,
            ])
          }
          renderInput={(startProps: any, endProps: any) => (
            <>
              <TextField {...startProps} helperText={error && error.message} />
              <Box sx={{ mx: 2 }}>đến</Box>
              <TextField {...endProps} helperText={error && error.message} />
            </>
          )}
          {...other}
        />
      )}
    />
  );
};

// RHFDateRangePicker.propTypes = {
//   startText: PropTypes.string.isRequired,
//   endText: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// };

export default RHFDateRangePicker;
