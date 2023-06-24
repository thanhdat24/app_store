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
import { useAppSelector } from "../../../redux/store";
type Props = {
  row: any;
  onDeleteRow: () => void;
  onCancelRow: () => void;
  onEditRow: () => void;
  onViewRow: () => void;
  onConfirmRow: () => void;
};

export default function ReceiptTableRow({
  row,
  onDeleteRow,
  onCancelRow,
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
    MASOPHIEU,
    NGAYTAO,
    NGAYCAPNHAT,
    TRANGTHAIPHIEU,
    TRANGTHAIHUY,
    KYTHU,
    KHACHHANG,
    CHITIETPHIEUTHUs,
  } = row;

  const { userLogin } = useAppSelector((state) => state.admin);

  return (
    <TableRow hover>
      <TableCell align="left">{MASOPHIEU}</TableCell>
      <TableCell align="left">{fDateTime(NGAYTAO)}</TableCell>
      <TableCell align="left">{fDateTime(NGAYCAPNHAT)}</TableCell>
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
      <TableCell align="left">{fMonthYear(KYTHU.TENKYTHU)}</TableCell>
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
      <TableCell align="left">{KHACHHANG.TUYENTHU.TENTUYENTHU}</TableCell>
      <TableCell align="left">
        {!TRANGTHAIPHIEU && !TRANGTHAIHUY && (
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
        {TRANGTHAIHUY && (
          <Button
            color="error"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 13,
              padding: "6px 12px",
              textWrap: "nowrap",
            }}
            variant="outlined"
          >
            Đã hủy
          </Button>
        )}
      </TableCell>
      <TableCell align="right">
        {TRANGTHAIHUY ? (
          <></>
        ) : (
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                {TRANGTHAIPHIEU || TRANGTHAIHUY ? (
                  <></>
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
                    {userLogin?.USERNAME === "admin" && (
                      <>
                        {/* <MenuItem
                          onClick={() => {
                            onDeleteRow();
                            handleCloseMenu();
                          }}
                          sx={{ color: "error.main" }}
                        >
                          <Iconify icon={"eva:trash-2-outline"} />
                          Xóa
                        </MenuItem> */}
                        <MenuItem
                          onClick={() => {
                            onCancelRow();
                            handleCloseMenu();
                          }}
                          sx={{ color: "error.main" }}
                        >
                          <Iconify icon={"flat-color-icons:cancel"} />
                          Huỷ phiếu
                        </MenuItem>
                      </>
                    )}
                  </>
                )}
                {TRANGTHAIPHIEU && (
                  <>
                    <MenuItem onClick={onViewRow}>
                      <Iconify icon={"eva:eye-fill"} />
                      Chi tiết
                    </MenuItem>
                  </>
                )}
              </>
            }
          />
        )}
      </TableCell>
    </TableRow>
  );
}
