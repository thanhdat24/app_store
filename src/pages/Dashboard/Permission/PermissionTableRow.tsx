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

type Props = {
  row: any;
  onDeleteRow: () => void;
  onEditRow: () => void;
};

export default function PermissionTableRow({
  row,
  onDeleteRow,
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

  const { IDQUYEN, TENQUYEN } = row;
  return (
    <TableRow hover>
      <TableCell align="left">{IDQUYEN}</TableCell>
      <TableCell align="left">{TENQUYEN}</TableCell>
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
