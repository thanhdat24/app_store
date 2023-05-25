import isString from "lodash/isString";
import PropTypes from "prop-types";
// @mui
import { Box, Typography, Link } from "@mui/material";
//
import Breadcrumbs from "./Breadcrumbs";

// ----------------------------------------------------------------------

interface HeaderBreadcrumbsProps {
  links: any;
  action?: React.ReactNode;
  heading: string;
  moreLink?: string | string[];
  sx?: object;
  [key: string]: any;
}

const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({
  links,
  action,
  heading,
  moreLink,
  sx,
  ...other
}) => {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{ fontWeight: 700, lineHeight: 1.5, fontSize: 23 }}
            variant="h4"
            gutterBottom
          >
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {moreLink !== undefined &&
          (isString(moreLink) ? (
            <Link
              href={moreLink}
              target="_blank"
              rel="noopener"
              variant="body2"
            >
              {moreLink}
            </Link>
          ) : (
            moreLink.map((href) => (
              <Link
                noWrap
                key={href}
                href={href}
                variant="body2"
                target="_blank"
                rel="noopener"
                sx={{ display: "table" }}
              >
                {href}
              </Link>
            ))
          ))}
      </Box>
    </Box>
  );
};

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default HeaderBreadcrumbs;
