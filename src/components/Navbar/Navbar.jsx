import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import HoverImage from "react-hover-image";
import SearchIcon from "@material-ui/icons/Search";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/ecomerceLogo.png";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import compareLogo from "../Comparision/justiceScale.png";
import LoginForm from "../Login/LoginForm";
const Navbar = ({
  totalItems,
  handleSearchItem,
  products,
  setOpenModal,
  LoginUser,
  checkLogin,
  setLogin,
  setLoginUser,
  typeLogin,
  avatarURL,
  numberItem,
  adminUser,
  numberConfirmOrd,
}) => {
  const history = useHistory();

  const handleClickProfile = () => {
    history.push("/profile");
  };
  const classes = useStyles();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [urlImage, setURLimage] = useState("");

  const handleClickProfileMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleClickYourOrder = () => {
    history.push("/order");
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  const handleSignOut = () => {
    setLogin(false);
    setLoginUser({});
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("urlAvatar");
    window.localStorage.setItem("checkLogin", false);
  };
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/152/152752.png"
              alt="commerce.js"
              style={{ height: "30px" }}
              className={classes.image}
            />
            Apple Store
          </Typography>

          {/* <div className={classes.search}>
            <TextField
              placeholder="search product"
              className={classes.searchInput}
              variant="outlined"
            />
            <SearchIcon className={classes.btnSearch} />
          </div> */}

          {location.pathname === "/" && (
            <div
              style={{
                marginLeft: "20%",
                borderColor: "black",
                border: "30px",
              }}
            >
              <SearchBar
                onSubmit={handleSearchItem}
                onHandleSearchItem={handleSearchItem}
              />
            </div>
          )}

          <div className={classes.grow} />
          <div>
            {checkLogin === false ? (
              <Button
                style={{
                  display: "flex",
                  backgroundColor: "#F57224",
                  color: "white",
                }}
                onClick={() => setOpenModal(true)}
              >
                Login
              </Button>
            ) : (
              <div>
                <img
                  src={avatarURL}
                  onClick={handleClickProfileMenu}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "400px",
                    marginRight: "10px",
                  }}
                ></img>
                <Menu
                  keepMounted
                  anchorEl={openMenu}
                  onClose={handleClose}
                  open={Boolean(openMenu)}
                >
                  <MenuItem onClick={handleClickProfile}>My Account</MenuItem>
                  <MenuItem onClick={handleClickYourOrder}>Your Order</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </div>
          <Button
            style={{
              backgroundColor: "white",
              border: "none",
            }}
            component={Link}
            to="/compare"
          >
            <img style={{ height: "30px", width: "30px" }} src={compareLogo} />
          </Button>

          {adminUser.user_type === "admin" && checkLogin == true ? (
            <div style={{ display: "" }}>
              <IconButton component={Link} to="/admin">
                <div style={{ display: "flex", alignItems: "right" }}>
                  <Badge
                    style={{ fontSize: "30px", display: "block" }}
                    overlap="rectangular"
                    badgeContent={numberConfirmOrd}
                    color="primary"
                  />
                  <ManageHistoryIcon style={{ color: "black" }} />
                </div>
              </IconButton>
            </div>
          ) : (
            <p></p>
          )}

          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge
                overlap="rectangular"
                badgeContent={numberItem}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
