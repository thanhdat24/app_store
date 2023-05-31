import { useState } from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// react-toastify
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider>
      <ToastContainer/>
        <Router />
    </ThemeProvider>
  );
}

export default App;
