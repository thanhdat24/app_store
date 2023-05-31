import { useState } from "react";

export default function useTabs(defaultValue: string) {
  const [currentTab, setCurrentTab] = useState<string>(defaultValue || "");

  return {
    currentTab,
    onChangeTab: (event: React.ChangeEvent<{}>, newValue: string) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
