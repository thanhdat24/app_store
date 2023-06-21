import PropTypes from "prop-types";
import { forwardRef, ForwardedRef, ReactNode } from "react";
// @mui
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, title = "", ...other }: PageProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <>
      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
