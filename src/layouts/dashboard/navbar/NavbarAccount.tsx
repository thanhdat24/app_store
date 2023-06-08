import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// hooks
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
import { useAppSelector } from "../../../redux/store";
// components

//

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha("#919EAB", 0.12),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

const NavbarAccount: React.FC = () => {
  const { userLogin } = useAppSelector((state) => state.admin);
  return (
    <Link underline="none" color="inherit" component={RouterLink} to="/">
      <RootStyle>
        {/* <MyAvatar /> */}

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Typography variant="subtitle2" noWrap sx={{ color: "#fff" }}>
         {userLogin?.HOTEN}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{ color: "green", fontWeight: 600 }}
          >
            Admin
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
};

export default NavbarAccount;
