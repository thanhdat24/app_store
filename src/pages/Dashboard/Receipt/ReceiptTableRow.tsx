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
  Button,
} from "@mui/material";
import { TableMoreMenu } from "../../../components/table";
import Iconify from "../../../components/Iconify";
import Label from "../../../components/Label";
import { formatPriceInVND } from "../../../utils/formatNumber";
import { fDate, fDateTime } from "../../../utils/formatTime";
type Props = {
  row: any;
  onDeleteRow: () => void;
  onEditRow: () => void;
  onViewRow: () => void;
  onConfirmRow: () => void;
};

export default function ReceiptTableRow({
  row,
  onDeleteRow,
  onEditRow,
  onViewRow,
  onConfirmRow,
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
    MAUSOPHIEU,
    KYHIEU,
    NGAYTAO,
    TRANGTHAIPHIEU,
    KYTHU,
    KHACHHANG,
    CHITIETPHIEUTHUs,
  } = row;
  return (
    <TableRow hover>
      <TableCell align="left">{MAUSOPHIEU}</TableCell>
      <TableCell align="left">{KYHIEU}</TableCell>
      <TableCell align="left">{fDateTime(NGAYTAO)}</TableCell>
      <TableCell align="left">
        {" "}
        <Label
          variant={"ghost"}
          color={TRANGTHAIPHIEU ? "success" : "error"}
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {TRANGTHAIPHIEU ? "Đã thu" : "Chưa thu"}
        </Label>
      </TableCell>
      <TableCell align="left">{KYTHU.TENKYTHU}</TableCell>
      <TableCell align="left">{KHACHHANG.HOTEN}</TableCell>
      <TableCell align="left">
        {" "}
        <Label
          variant={"ghost"}
          color={
            (KHACHHANG.LOAIKH.TENLOAI === "Hộ Dân" && "info") ||
            (KHACHHANG.LOAIKH.TENLOAI === "Doanh Nghiệp" && "error") ||
            "default"
          }
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {KHACHHANG.LOAIKH.TENLOAI}
        </Label>
      </TableCell>
      <TableCell align="left">
        {formatPriceInVND(CHITIETPHIEUTHUs[0]?.SOTIEN)}
      </TableCell>
      <TableCell align="left">
        {!TRANGTHAIPHIEU && (
          <Button
            color="secondary"
            onClick={onConfirmRow}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              textWrap: "nowrap",
            }}
            variant="outlined"
          >
            Thu phiếu
          </Button>
        )}
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {TRANGTHAIPHIEU ? (
                <MenuItem onClick={onViewRow}>
                  <Iconify icon={"eva:eye-fill"} />
                  Chi tiết
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={onViewRow}>
                    <Iconify icon={"eva:eye-fill"} />
                    Chi tiết
                  </MenuItem>
                  <MenuItem onClick={onEditRow}>
                    <Iconify icon={"eva:edit-fill"} />
                    Chỉnh sửa
                  </MenuItem>
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
                </>
              )}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
