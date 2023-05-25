import React, { useState } from "react";
// @mui
import AppBar from "@mui/material/AppBar";
import toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import Container from "@mui/material/Container";
import { styled, useTheme, alpha } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { HEADER } from "../../utils/config";
import cssStyles from "../../utils/cssStyles";
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import Avatar from "../../components/Avatar";
//
import Menu from "./Menu";
import navConfig from "./MenuConfig";
// router-dom
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// routes
import { PATH_AUTH } from "../../routes/paths";
import SearchNotFound from "../../components/SearchNotFound";
import InputStyle from "../../components/InputStyle";
import Iconify from "../../components/Iconify";

const ToolbarStyle = styled(toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));
const transparent = alpha("#919EAB", 0.16);
const ToolbarShadowStyle = styled("div")(() => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: `0 8px 16px 0 ${transparent}`,
}));

type Props = {};

export default function MainHeader({}: Props) {
  const [open, setOpen] = React.useState(false);

  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleLogin = () => {
    navigate(PATH_AUTH.login);
  };
  const PopperStyle = styled((props) => (
    <Popper open={open} placement="bottom-start" {...props} />
  ))({
    width: "508px !important",
  });

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchQuery(value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // handleClick(searchQuery);
    }
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          <Label color="info" sx={{ ml: 1 }}>
            TypeScript
          </Label>
          <Box className="flex justify-center items-center">
            <Autocomplete
              size="small"
              // autoHighlight
              popupIcon={null}
              PopperComponent={PopperStyle}
              options={searchResults}
              onInputChange={(event, value) => handleChangeSearch(value)}
              // getOptionLabel={(product) => product.name}
              noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <InputStyle
                  {...params}
                  name="search"
                  stretchstart={450}
                  placeholder="Bạn tìm gì hôm nay"
                  onKeyUp={handleKeyUp}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify
                          icon={"eva:search-fill"}
                          sx={{
                            ml: 1,
                            width: 20,
                            height: 20,
                            color: "text.disabled",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Menu isOffset={isOffset} isHome={isHome} item={navConfig} />

          <Button
            onClick={handleLogin}
            sx={{ borderRadius: 100, padding: 0, minWidth: 0 }}
          >
            <Avatar src="" color={"default"}>
              {/* {createAvatar(user?.displayName).name} */}
            </Avatar>
          </Button>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
