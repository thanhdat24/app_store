import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
  DialogContent,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import { TableMoreMenu } from "../../../components/table";
import Iconify from "../../../components/Iconify";
import Label from "../../../components/Label";
import { fDate } from "../../../utils/formatTime";
import { toast } from "react-toastify";

type Props = {
  row: any;
  selected: boolean;
  onDeleteRow: () => void;
  onEditRow: () => void;
  onSelectRow: () => void;
  userLogin: any;
  index: any;
};

export default function CustomerTableRow({
  row,
  selected,
  onDeleteRow,
  onEditRow,
  onSelectRow,
  userLogin,
  index,
}: Props) {
  const [openMenu, setOpenMenuActions] = useState<null | HTMLElement>(null); // Add type annotation

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    // Add type annotation
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const {
    IDKHACHHANG,
    HOTEN,
    CMT,
    DIACHI,
    LOAIKH,
    NGAYCAP,
    MAKHACHHANG,
    TUYENTHU,
    TRANGTHAI,
    USERNAME,
  } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{MAKHACHHANG}</TableCell>
      <TableCell align="left">{HOTEN}</TableCell>
      <TableCell align="left">{CMT}</TableCell>
      <TableCell align="left">{fDate(NGAYCAP)}</TableCell>
      <TableCell align="left">{DIACHI}</TableCell>
      <TableCell align="left">
        <Label
          variant={"ghost"}
          color={
            (LOAIKH.TENLOAI === "Hộ Dân" && "info") ||
            (LOAIKH.TENLOAI === "Doanh Nghiệp" && "error") ||
            "default"
          }
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {LOAIKH.TENLOAI}
        </Label>
      </TableCell>
      <TableCell align="left">{TUYENTHU.TENTUYENTHU}</TableCell>
      <TableCell align="left">
        <Label
          variant={"ghost"}
          color={TRANGTHAI ? "success" : "error"}
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {TRANGTHAI ? "Hoạt động" : "Khoá"}
        </Label>
      </TableCell>
      {userLogin?.USERNAME === "admin" ? (
        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: "error.main" }}
                >
                  <Iconify icon={"eva:trash-2-outline"} />
                  Xóa
                </MenuItem>
                <MenuItem onClick={onEditRow}>
                  <Iconify icon={"eva:edit-fill"} />
                  Chỉnh sửa
                </MenuItem>
              </>
            }
          />
        </TableCell>
      ) : (
        <TableCell align="right">
          <Tooltip title="Chi tiết">
            <IconButton
              color="primary"
              onClick={() => {
                // onDeleteRow();
                // handleCloseMenu();
              }}
            >
              <Iconify icon={"raphael:view"} sx={{ width: 25, height: 25 }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
}
