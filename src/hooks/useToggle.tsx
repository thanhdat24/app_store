import { useState } from "react";

interface ToggleState {
  toggle: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useToggle(defaultChecked: boolean): ToggleState {
  const [toggle, setToggle] = useState(defaultChecked || false);

  return {
    toggle,
    onToggle: () => setToggle(!toggle),
    onOpen: () => setToggle(true),
    onClose: () => setToggle(false),
    setToggle,
  };
}
