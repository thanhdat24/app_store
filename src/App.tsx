// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// react-toastify
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer />
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
