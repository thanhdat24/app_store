// @mui
import { Checkbox, Typography, Stack } from "@mui/material";

// ----------------------------------------------------------------------

interface TableSelectedActionsProps {
  dense?: boolean;
  actions?: React.ReactNode;
  rowCount?: number;
  numSelected?: number;
  onSelectAllRows?: (checked: boolean) => void;
}

export default function TableSelectedActions({
  dense,
  actions,
  rowCount,
  numSelected,
  onSelectAllRows,
}: TableSelectedActionsProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 2,
        top: 0,
        right: 8,
        zIndex: 9,
        height: 58,
        borderRadius: 1,
        position: "absolute",
        width: "calc(100% - 16px)",
        bgcolor: "primary.lighter",
        ...(dense && {
          pl: 1,
          height: 38,
        }),
      }}
    >
      <Checkbox
        indeterminate={
          numSelected !== undefined &&
          numSelected > 0 &&
          numSelected < rowCount!
        }
        checked={
          rowCount !== undefined &&
          numSelected !== undefined &&
          rowCount > 0 &&
          numSelected === rowCount
        }
        onChange={(event) => onSelectAllRows?.(event.target.checked)}
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: "primary.main",
          ...(dense && {
            ml: 3,
          }),
        }}
      >
        {numSelected !== undefined ? `${numSelected} selected` : ""}
      </Typography>

      {actions && actions}
    </Stack>
  );
}
