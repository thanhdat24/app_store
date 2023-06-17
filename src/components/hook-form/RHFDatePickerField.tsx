import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

// ----------------------------------------------------------------------

interface RHFDatePickerFieldProps {
  name: string;
  format?: string; // Thêm prop format vào interface
  [key: string]: any;
  sx?: any;
  label?: string;
  views?: any;
  defaultCalendarMonth?: string | number | Date | undefined | null;
}

const RHFDatePickerField: React.FC<RHFDatePickerFieldProps> = ({
  sx,
  name,
  format, // Lấy prop format từ props
  label,
  views,
  defaultCalendarMonth,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          views={views}
          label={label}
          defaultCalendarMonth={
            defaultCalendarMonth
              ? dayjs(new Date(defaultCalendarMonth))
              : undefined
          }
          sx={sx}
          onError={(newError) => newError}
          slotProps={{
            textField: {
              helperText: (
                <span className="!text-[#d32f2f] text-xs">
                  {error?.message}
                </span>
              ),
            },
          }}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date: Dayjs | null) =>
            field.onChange(date ? date.format(format) : null)
          } // Sử dụng prop format để định dạng ngày
          {...other}
        />
      )}
    />
  );
};

RHFDatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RHFDatePickerField;
