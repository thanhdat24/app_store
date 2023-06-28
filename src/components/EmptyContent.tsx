// @mui
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
//
import Image from "./Image";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

interface EmptyContentProps {
  title: string;
  description?: string;
  img?: string;
  sx?: any;
}

export default function EmptyContent({
  title,
  description,
  img,
  sx,
  ...other
}: EmptyContentProps) {
  return (
    <RootStyle {...other}>
      <img
        className="max-w-[160px] mb-3"
        src={img || "/images/empty_content.svg"}
        alt="Avatar"
      />
      {/* <Image
        // disabledEffect
        // visibleByDefault
        alt="empty content"
        src={img || "/images/empty_content.svg"}
        sx={{ height: 240, mb: 3 }}
      /> */}

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
