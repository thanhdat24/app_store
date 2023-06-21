// @mui
import { TableRow, TableCell } from "@mui/material";
//
import EmptyContent from "../EmptyContent";

// ----------------------------------------------------------------------

interface TableNoDataProps {
  isNotFound?: boolean;
}

export default function TableNoData({ isNotFound }: TableNoDataProps) {
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={9}>
            <EmptyContent
              title="Không có dữ liệu"
              sx={{
                "& span.MuiBox-root": { height: 160 },
              }}
            />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}
