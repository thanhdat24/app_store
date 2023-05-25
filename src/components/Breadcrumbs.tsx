import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Typography,
  Breadcrumbs as MUIBreadcrumbs,
} from "@mui/material";

// ----------------------------------------------------------------------
interface BreadcrumbsProps {
  links: any;
  activeLast?: boolean;
  sx?: object;
  [key: string]: any;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  links,
  activeLast = false,
  sx,
  ...other
}) => {
  const currentLink = links[links.length - 1].name;

  const listDefault = links.map((link: any) => (
    <LinkItem key={link.name} link={link} />
  ));

  const listActiveLast = links.map((link: any) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "text.disabled",
            textOverflow: "ellipsis",
            lineHeight: 22 / 14,
            fontSize: 14,
            textDecoration: "none !important",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={
        <Box
          component="span"
          sx={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            bgcolor: "text.disabled",
            mx: 1,
          }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  activeLast: PropTypes.bool,
  links: PropTypes.array.isRequired,
};

export default Breadcrumbs;
// ----------------------------------------------------------------------

interface LinkItemProps {
  link: any;
}

function LinkItem({ link }: LinkItemProps) {
  const { href, name, icon } = link;
  return (
    <Link
      key={name}
      variant="body2"
      component={RouterLink}
      to={href || "#"}
      sx={{
        lineHeight: 2,
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        "& > div": { display: "inherit" },
        fontSize: 14,
        textDecoration: "none !important",
        "&:hover": {
          textDecoration: "underline !important",
        },
      }}
    >
      {icon && (
        <Box sx={{ mr: 1, "& svg": { width: 20, height: 20 } }}>{icon}</Box>
      )}
      {name}
    </Link>
  );
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string,
    icon: PropTypes.any,
    name: PropTypes.string,
  }),
};
