import React, { MouseEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Avatar as MUIAvatar,
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
} from "@mui/material";
import MenuPopover from "../../../components/MenuPopover";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { logout } from "../../../redux/slices/adminReducer";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
type Props = {};

const MENU_OPTIONS_ADMIN = [
  {
    label: "Trang chủ",
    linkTo: PATH_DASHBOARD.general.dashboard,
  },
  {
    label: "Tài khoản",
    linkTo: PATH_DASHBOARD.user.account,
  },
];

export default function AccountPopover({}: Props) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const { userLogin } = useAppSelector((state) => state.admin);

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(PATH_AUTH.login, { replace: true });
    window.location.reload();
    if (isMountedRef.current) {
      handleClose();
    }
  };
  return (
    <>
      <div
        onClick={handleOpen}
        className={
          "active:transform active:scale-95 py-3 h-[70%] rounded-full flex items-center  transition-base cursor-pointer select-none mr-5 hover:bg-gray-200 " +
          " " +
          (open ? "bg-green-100 text-green-600" : "")
        }
      >
        <div className="relative flex-shrink-0 flex items-center ml-1">
          <img
            className="h-6 w-6 md:h-8 md:w-8 select-none bg-white rounded-full object-cover flex-shrink-0 "
            src="https://teeappapi.azurewebsites.net/default/default-male.svg"
            alt="Avatar"
          />
        </div>
        <span className="px-2 font-semibold truncate w-full text-black">
          UserName
        </span>
      </div>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          borderRadius: "12px",
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: "8px",
            margin: "6px 9px",
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Admin
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Quản trị hệ thống
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        {MENU_OPTIONS_ADMIN.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem onClick={handleLogout} sx={{ my: 1 }}>
          Đăng xuất
        </MenuItem>
      </MenuPopover>
    </>
  );
}
