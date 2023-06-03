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
} from "@mui/material";
import { TableMoreMenu } from "../../../components/table";
import Iconify from "../../../components/Iconify";
import Label from "../../../components/Label";
import { formatPriceInVND } from "../../../utils/formatNumber";

type Props = {
  row: any;
  selected: boolean;
  onDeleteRow: () => void;
  onSelectRow: () => void;
  onEditRow: () => void;
};

export default function StaffTableRow({
  row,
  selected,
  onDeleteRow,
  onSelectRow,
  onEditRow,
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
    IDNHANVIEN,
    MANHANVIEN,
    HOTEN,
    SDT,
    NGAYSINH,
    DIACHI,
    CHITIETPHANQUYENs,
  } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell align="left"></TableCell>

      <TableCell align="left">{IDNHANVIEN}</TableCell>
      <TableCell align="left">{MANHANVIEN}</TableCell>
      <TableCell align="left">{HOTEN}</TableCell>
      <TableCell align="left">{SDT}</TableCell>
      <TableCell align="left">{NGAYSINH}</TableCell>
      <TableCell align="left">{DIACHI}</TableCell>
      <TableCell align="left">
        {CHITIETPHANQUYENs.map((item: any) => (
          <Label
            key={item.IDCHITIETPHANQUYEN}
            variant={"ghost"}
            color={
              (item.QUYEN.TENQUYEN === "Quản trị hệ thống" && "error") ||
              (item.QUYEN.TENQUYEN === "Nhân viên quản trị" && "secondary") ||
              "info"
            }
            sx={{ textTransform: "uppercase", mb: 1 }}
          >
            {item.QUYEN.TENQUYEN}
          </Label>
          // <span key={item.IDNHANVIEN}> {item.QUYEN.TENQUYEN}</span>
        ))}
      </TableCell>

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
    </TableRow>
  );
}
