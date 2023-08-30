import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

function isAuthenticated() {
  let token = localStorage.getItem("token") || "";
  try {
    let jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    const { exp } = jwtPayload;
    if (exp < (new Date().getTime() + 1) / 1000) {
      localStorage.removeItem("token");
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}
function Header(props) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Link to="/">
          {" "}
          <Button size="large">Employee</Button>
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        ></Typography>
        {isAuthenticated() ? (
          <>
            {" "}
            <Button
              variant="text"
              size="small"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/register">
              {" "}
              <Button style={{ marginRight: 3 }} variant="text" size="small">
                Sign up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="contained" size="small">
                Sign in
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
