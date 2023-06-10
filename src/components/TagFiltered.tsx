// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Chip, Typography, Stack, Button } from "@mui/material";
// utils
import Iconify from "./Iconify";
// components

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
});

const WrapperStyle = styled("div")(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "stretch",
  gap: "8px",
  marginRight: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px rgba(0, 0, 0, 0.12)`,
}));

interface LabelStyleProps {
  children: string;
}

const LabelStyle = styled(({ children, ...props }: LabelStyleProps) => (
  <Typography
    component="span"
    variant="subtitle2"
    {...props}
    sx={{ padding: "0px !important" }}
  >
    {children}
  </Typography>
))(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  color: "black",
  // backgroundColor: theme.palette.background.neutral,
  // borderRight: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

// ShopTagFiltered.propTypes = {
//   filters: PropTypes.object,
//   isShowReset: PropTypes.bool,
//   onRemoveGender: PropTypes.func,
//   onRemoveCategory: PropTypes.func,
//   onRemoveColor: PropTypes.func,
//   onRemovePrice: PropTypes.func,
//   onRemoveRating: PropTypes.func,
//   onResetAll: PropTypes.func,
// };

interface TagFilteredProps {
  filters: any;
  isShowReset: boolean;
  onRemoveRevenueRoute: any;
  onResetAll: any;
  onRemoveActive: any;
}

export default function TagFiltered({
  filters,
  onRemoveRevenueRoute,
  isShowReset,
  onResetAll,
  onRemoveActive,
}: TagFilteredProps) {
  const theme = useTheme();
  const { TUYENTHU, TRANGTHAI } = filters;

  return (
    <RootStyle>
      {TUYENTHU?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Tuyến thu:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            {TUYENTHU.map((TT: any) => (
              <Chip
                key={TT}
                label={TT}
                size="small"
                onDelete={() => onRemoveRevenueRoute(TT)}
                sx={{
                  py: 1.3,
                  m: 0.5,
                  borderRadius: "8px",
                  height: "24px",
                  fontSize: "0.8125rem",
                  "&:hover": {
                    backgroundColor: "rgb(69, 79, 91)",
                  },
                  color: "#fff",
                  backgroundColor: "rgb(33, 43, 54)",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                    opacity: 0.48,
                    fontSize: 19,
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#fff",
                    opacity: 1,
                    transition: "all 250ms ease-in-out",
                  },
                }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {TRANGTHAI?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Trạng thái:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            {TRANGTHAI.map((TT: any) => (
              <Chip
                color={TT === "Hoạt động" ? "success" : "error"}
                key={TT}
                label={TT}
                size="small"
                onDelete={() => onRemoveActive(TT)}
                sx={{
                  py: 1.3,
                  m: 0.5,
                  borderRadius: "8px",
                  height: "24px",
                  fontSize: "0.8125rem",
                  "& .MuiSvgIcon-root": {
                    fontSize: 19,
                  },
                }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {isShowReset && (
        <Button
          sx={{ ml: 1 }}
          color="error"
          size="small"
          onClick={onResetAll}
          startIcon={<Iconify icon={"ic:round-clear-all"} />}
        >
          Xoá tất cả
        </Button>
      )}
    </RootStyle>
  );
}
