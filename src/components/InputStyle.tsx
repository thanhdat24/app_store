// @mui
import { styled, alpha } from "@mui/material/styles";
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  stretchstart?: number;
}
const transparent = alpha("#919EAB", 0.16);
const InputStyle = styled(TextField, {
  // shouldForwardProp: (prop) => prop !== 'stretchstart',
})<InputProps>(({ stretchstart, theme }) => ({
  "& .MuiOutlinedInput-root": {
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": {
      boxShadow: `0 12px 24px -4px ${transparent}`,
    },
    ...(stretchstart && {
      width: stretchstart,
      "&.Mui-focused": {
        boxShadow: `0 12px 24px -4px ${transparent}`,
        [theme.breakpoints.up("sm")]: {
          width: stretchstart + 60,
        },
      },
    }),
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `alpha('#919EAB', 0.32) !important`,
  },
}));

export default InputStyle;
