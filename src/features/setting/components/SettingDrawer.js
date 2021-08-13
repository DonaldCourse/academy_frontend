import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Link } from "@material-ui/core";
import { ImportContacts } from "@material-ui/icons";
import { useAuth } from "../../../context/auth";

const drawerWidth = 240;

SettingDrawer.propTypes = {};

function ListItemLink(props) {
  return <ListItem button component="div" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 0 35px 0 rgb(154 161 171 / 15%)",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerOpenPaper: {
    display: "contents",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosePaper: {
    display: "contents",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
}));

function SettingDrawer({ open, onClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useAuth();
  const userProfile = useSelector(state => state.authSlide.auth);
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpenPaper]: open,
          [classes.drawerClosePaper]: !open,
        }),
      }}
    >
      {!open ? (
        <Avatar
          className={classes.info}
          alt="Remy Sharp"
          src={process.env.REACT_APP_BASE_URL_CDN  + userProfile.avatar}
        />
      ) : (
        <div className={classes.info}>
          <Avatar
            alt="Remy Sharp"
            style={{ width: 70, height: 70 }}
            src={process.env.REACT_APP_BASE_URL_CDN + userProfile.avatar}
          />
          <Typography variant="h4" component="h4" style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
            <Box style={{ whiteSpace: "pre-wrap", textAlign: "center" }} fontWeight="fontWeightBold">
              {userProfile.name}
            </Box>
          </Typography>
          <Typography variant="body2" component="p" style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
            {userProfile.email}
          </Typography>
        </div>
      )}

      <Divider />
      <List>
        <ListItemLink onClick={() => history.push("/setting/profile")}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Thông tin cá nhân"} />
        </ListItemLink>
        <ListItemLink onClick={() => history.push("/setting/my-courses")}>
          <ListItemIcon>
            <ImportContacts />
          </ListItemIcon>
          <ListItemText primary={"Khóa học của tôi"} />
        </ListItemLink>
        <ListItemLink onClick={() => history.push("/setting/my-favorite-courses")}>
          <ListItemIcon>
            <FavoriteBorderOutlined />
          </ListItemIcon>
          <ListItemText primary={"Khóa học yêu thích"} />
        </ListItemLink>
        <ListItemLink onClick={() => history.push("/setting/change-password")}>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Thay đổi mật khẩu"} />
        </ListItemLink>
      </List>
      <Divider />
      <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
    </Drawer>
  );
}

export default SettingDrawer;
