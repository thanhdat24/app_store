import { useState } from "react";

export default function useTabs(defaultValue: string) {
  const [currentTab, setCurrentTab] = useState<string>(defaultValue || "");

  return {
    currentTab,
    onChangeTab: (newValue: any) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
