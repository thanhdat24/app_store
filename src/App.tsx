import { useState } from "react";
// routes
import Router from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return <Router />;
}

export default App;
