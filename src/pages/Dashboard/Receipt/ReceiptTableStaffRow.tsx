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
import { fDate, fDateTime, fMonthYear } from "../../../utils/formatTime";
type Props = {
  row: any;
  onDeleteRow: () => void;
  onEditRow: () => void;
  onViewRow: () => void;
  onConfirmRow: () => void;
};

export default function ReceiptTableStaffRow({
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
    PHIEUTHUs,
    LOAIKH,
    TUYENTHU,
    TRANGTHAIPHIEU,
    KYTHU,
    HOTEN,
    CHITIETPHIEUTHUs,
  } = row;
  return (
    <TableRow hover>
      <TableCell align="left">{PHIEUTHUs[0]?.MAUSOPHIEU}</TableCell>
      <TableCell align="left">{PHIEUTHUs[0]?.KYHIEU}</TableCell>
      <TableCell align="left">
        {PHIEUTHUs[0]?.NGAYTAO && fDate(PHIEUTHUs[0]?.NGAYTAO)}
      </TableCell>
      <TableCell align="left">
        {PHIEUTHUs.length > 0 ? (
          <Label
            variant={"ghost"}
            color={PHIEUTHUs[0]?.TRANGTHAIPHIEU ? "success" : "error"}
            sx={{ textTransform: "uppercase", mb: 1 }}
          >
            {PHIEUTHUs[0]?.TRANGTHAIPHIEU ? "Đã thu" : "Chưa thu"}
          </Label>
        ) : (
          <Label
            variant={"ghost"}
            color={"secondary"}
            sx={{ textTransform: "uppercase", mb: 1 }}
          >
            Chưa có phiếu thu
          </Label>
        )}
      </TableCell>
      <TableCell align="left">{fMonthYear(KYTHU.TENKYTHU)}</TableCell>
      <TableCell align="left">{HOTEN}</TableCell>
      <TableCell align="left">
        {" "}
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
        {!TRANGTHAIPHIEU && (
          <Button
            color="secondary"
            onClick={onConfirmRow}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 13,
              padding: "6px 12px",
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
