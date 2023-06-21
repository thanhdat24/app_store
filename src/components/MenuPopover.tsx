// import PropTypes from "prop-types";
// @mui
// import { alpha, styled } from "@mui/material/styles";
import { Popover, PopoverOrigin } from "@mui/material";

// ----------------------------------------------------------------------

// const ArrowStyle = styled("span")<{
//   arrow?: string;
// }>(({ arrow }) => {
//   const SIZE = 12;

//   const POSITION = -(SIZE / 2);

//   const borderStyle = `solid 1px ${alpha("#919EAB", 0.12)}`;

//   const topStyle = {
//     borderRadius: "0 0 3px 0",
//     top: POSITION,
//     borderBottom: borderStyle,
//     borderRight: borderStyle,
//   };
//   const bottomStyle = {
//     borderRadius: "3px 0 0 0",
//     bottom: POSITION,
//     borderTop: borderStyle,
//     borderLeft: borderStyle,
//   };
//   const leftStyle = {
//     borderRadius: "0 3px 0 0",
//     left: POSITION,
//     borderTop: borderStyle,
//     borderRight: borderStyle,
//   };
//   const rightStyle = {
//     borderRadius: "0 0 0 3px",
//     right: POSITION,
//     borderBottom: borderStyle,
//     borderLeft: borderStyle,
//   };

//   return {
//     // Top
//     ...(arrow === "top-left" && { ...topStyle, left: 20 }),
//     ...(arrow === "top-center" && {
//       ...topStyle,
//       left: 0,
//       right: 0,
//       margin: "auto",
//     }),
//     ...(arrow === "top-right" && { ...topStyle, right: 20 }),
//     // Bottom
//     ...(arrow === "bottom-left" && { ...bottomStyle, left: 20 }),
//     ...(arrow === "bottom-center" && {
//       ...bottomStyle,
//       left: 0,
//       right: 0,
//       margin: "auto",
//     }),
//     ...(arrow === "bottom-right" && { ...bottomStyle, right: 20 }),
//     // Left
//     ...(arrow === "left-top" && { ...leftStyle, top: 20 }),
//     ...(arrow === "left-center" && {
//       ...leftStyle,
//       top: 0,
//       bottom: 0,
//       margin: "auto",
//     }),
//     ...(arrow === "left-bottom" && { ...leftStyle, bottom: 20 }),
//     // Right
//     ...(arrow === "right-top" && { ...rightStyle, top: 20 }),
//     ...(arrow === "right-center" && {
//       ...rightStyle,
//       top: 0,
//       bottom: 0,
//       margin: "auto",
//     }),
//     ...(arrow === "right-bottom" && { ...rightStyle, bottom: 20 }),
//   };
// });

// ----------------------------------------------------------------------

interface MenuPopoverProps {
  sx?: object;
  children?: React.ReactNode;
  disabledArrow?: boolean;

  open: boolean;
  anchorEl: Element | null;
  onClose: () => void;
  anchorOrigin?: object;
  transformOrigin?: object;
}

export default function MenuPopover({
  children,
  disabledArrow,
  sx,
  open,
  anchorEl,
  onClose,
  anchorOrigin = { vertical: "bottom", horizontal: "right" }, // Provide default values
  transformOrigin = { vertical: "top", horizontal: "left" }, // Provide default values
  ...other
}: MenuPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin as PopoverOrigin} // Add type assertion
      transformOrigin={transformOrigin as PopoverOrigin}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: "inherit",
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}
