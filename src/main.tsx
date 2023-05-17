import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
// redux
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
