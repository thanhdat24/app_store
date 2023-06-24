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
import { formatPriceInVND } from "../../../../utils/formatNumber";
import { fMonthYear } from "../../../../utils/formatTime";

type Props = { row: any; index: any };

export default function RevenueStatisticsTable({ row, index }: Props) {
  const {
    tentuyenthu,
    nhanvienthu,
    tenkythu,
    soluongdathu,
    soluongchuathu,
    soluongphieuhuy,
    tongtien,
    lpq,
    soluongtong,
    phantramdathu,
    phantramchuathu,
  } = row;
  return (
    <TableRow
      hover
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: "rgba(0, 120, 103, 0.04)",
        },
      }}
    >
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">{fMonthYear(tenkythu)}</TableCell>
      <TableCell align="left">{tentuyenthu}</TableCell>
      <TableCell align="left">{soluongtong}</TableCell>
      <TableCell align="left">{soluongdathu}</TableCell>
      <TableCell align="left">{soluongchuathu}</TableCell>
      <TableCell align="left">{soluongphieuhuy}</TableCell>
      <TableCell align="left">{formatPriceInVND(tongtien)}</TableCell>
      <TableCell align="left">{phantramdathu}%</TableCell>
      <TableCell align="left">{phantramchuathu}%</TableCell>
    </TableRow>
  );
}
