// @mui
import {  styled } from "@mui/material/styles";
import { Chip, Typography, Stack, Button } from "@mui/material";
// utils
import { fMonthYear, fDate } from "../utils/formatTime";
import { Icon } from "@iconify/react";
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
  onRemoveRevenueRoute?: any;
  onResetAll: any;
  onRemoveActive?: any;
  onRemoveBillPeriod?: any;
  onRemoveStaff?: any;
  onRemoveDay?: any;
  onRemoveMonth?: any;
  onRemoveActiveBill?: any;
}

export default function TagFiltered({
  filters,
  onRemoveRevenueRoute,
  isShowReset,
  onResetAll,
  onRemoveActive,
  onRemoveBillPeriod,
  onRemoveStaff,
  onRemoveDay,
  onRemoveMonth,
  onRemoveActiveBill,
}: TagFilteredProps) {
  const {
    TUYENTHU,
    TUYENTHUTK,
    TRANGTHAI,
    KYTHUBATDAU,
    KYTHUKETTHUC,
    NHANVIENTHU,
    NGAYTHUBATDAU,
    NGAYTHUKETTHUC,
    TRANGTHAIPHIEU,
    KYTHU,
    QUANHUYEN,
    XAPHUONG,
  } = filters;
  return (
    <RootStyle>
      {KYTHU?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Kỳ thu:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            <Chip
              key={KYTHU}
              label={fMonthYear(KYTHU)}
              size="small"
              onDelete={() => onRemoveMonth(KYTHU)}
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
          </Stack>
        </WrapperStyle>
      )}
      {(NGAYTHUBATDAU || NGAYTHUKETTHUC) && (
        <WrapperStyle>
          <LabelStyle>Ngày thu:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            <Chip
              key={NGAYTHUBATDAU}
              label={
                NGAYTHUBATDAU && NGAYTHUKETTHUC
                  ? `${fDate(NGAYTHUBATDAU)} - ${fDate(NGAYTHUKETTHUC)}`
                  : fDate(NGAYTHUBATDAU)
              }
              size="small"
              onDelete={() => onRemoveDay(NGAYTHUBATDAU)}
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
          </Stack>
        </WrapperStyle>
      )}
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

      {TUYENTHUTK && (
        <WrapperStyle>
          <LabelStyle>Tuyến thu:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            <Chip
              key={TUYENTHUTK}
              label={JSON.parse(TUYENTHUTK).tentuyenthu}
              size="small"
              onDelete={() => onRemoveRevenueRoute(TUYENTHUTK)}
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
          </Stack>
        </WrapperStyle>
      )}

      {(KYTHUBATDAU || KYTHUKETTHUC) && (
        <WrapperStyle>
          <LabelStyle>Kỳ thu:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            <Chip
              key={KYTHUBATDAU}
              label={
                KYTHUBATDAU && KYTHUKETTHUC
                  ? `${fMonthYear(KYTHUBATDAU)} - ${fMonthYear(KYTHUKETTHUC)}`
                  : fMonthYear(KYTHUBATDAU)
              }
              size="small"
              onDelete={() => onRemoveBillPeriod(KYTHUBATDAU)}
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

      {NHANVIENTHU?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Tuyến thu:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            {NHANVIENTHU.map((NV: any) => (
              <Chip
                key={NV}
                label={NV}
                size="small"
                onDelete={() => onRemoveStaff(NV)}
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

      {TRANGTHAIPHIEU?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Trạng thái:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            {TRANGTHAIPHIEU.map((TT: any) => (
              <Chip
                color={TT === "Đã thu" ? "success" : "error"}
                key={TT}
                label={TT}
                size="small"
                onDelete={() => onRemoveActiveBill(TT)}
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
      {QUANHUYEN && (
        <WrapperStyle>
          <LabelStyle>Quận huyện:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            <Chip
              key={QUANHUYEN}
              label={JSON.parse(QUANHUYEN).TENQUANHUYEN}
              size="small"
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
          </Stack>
        </WrapperStyle>
      )}

      {XAPHUONG && (
        <WrapperStyle>
          <LabelStyle>Xã phường:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0 }}>
            <Chip
              key={XAPHUONG}
              label={JSON.parse(XAPHUONG).TENXAPHUONG}
              size="small"
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
          </Stack>
        </WrapperStyle>
      )}

      {isShowReset && (
        <Button
          sx={{ ml: 1, color: "rgb(255, 86, 48)" }}
          color="error"
          size="small"
          onClick={onResetAll}
          startIcon={
            <Icon
              icon="basil:trash-solid"
              color="#ff5630"
              width="20"
              height="20"
              hFlip={true}
            />
          }
        >
          Xoá tất cả
        </Button>
      )}
    </RootStyle>
  );
}
