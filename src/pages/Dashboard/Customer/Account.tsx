import React from "react";
// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import { AccountGeneral } from "../../../sections/@dashboard/user";
type Props = {};

export default function Account({}: Props) {
  const [currentTab, onChangeTab] = React.useState("Thông tin chung");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChangeTab(newValue);
  };

  const ACCOUNT_TABS = [
    {
      value: "Thông tin chung",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: "Đổi mật khẩu",
      icon: <Iconify icon={"ic:round-vpn-key"} width={20} height={20} />,
      //   component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="Customer: Account Settings">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Tài khoản"
          links={[
            { name: "Quản lý", href: PATH_DASHBOARD.root },
            { name: "Người dùng", href: PATH_DASHBOARD.user.root },
            { name: "Cài đặt tài khoản" },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={handleChange}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.value}
              icon={tab.icon}
              value={tab.value}
              iconPosition="start"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 14,
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
