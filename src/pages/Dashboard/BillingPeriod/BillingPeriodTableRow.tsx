import { useState } from "react";

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
import { fMonthYear } from "../../../utils/formatTime";

type Props = {
  row: any;
  onDeleteRow: () => void;
  onEditRow: () => void;
  index: any
};

export default function BillingPeriodTableRow({
  row,
  onDeleteRow,
  onEditRow,
  index
}: Props) {
  const [openMenu, setOpenMenuActions] = useState<null | HTMLElement>(null); // Add type annotation

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    // Add type annotation
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const {TENKYTHU, TRANGTHAIKYTHU } = row;
  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{fMonthYear(TENKYTHU)}</TableCell>
      <TableCell align="left">
        {" "}
        <Label
          variant={"ghost"}
          color={TRANGTHAIKYTHU ? "success" : "error"}
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {TRANGTHAIKYTHU ? "Đang hoạt động" : "Đã kết thúc"}
        </Label>
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
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
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
