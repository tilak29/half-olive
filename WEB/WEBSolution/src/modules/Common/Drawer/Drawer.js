import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  Toolbar,
  MenuItem,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  ChevronRight,
  ChevronLeft,
  ExpandMore,
  Notifications,
} from "@material-ui/icons";
import { TreeView, TreeItem } from "@material-ui/lab";

import logo from "../../../Images/logohere.jpeg";
import "./DrawerStyle.css";
import MainPageRouter from "../../AppRouting/MainPageRouter";
import ChangePassword from "../../ChangePassword/ChangePasswordContainer";
import UserProfile from "../../UserProfile/UserProfileContainer";
import NotificationsList from "../../Notifications/NotificationsContainer";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";

const drawerWidth = 250;

const menuRoutes = [
  { menu: "Manage Booking", route: "/manage/manageBooking" },
  { menu: "Date-Wise Meal Template", route: "/manage/dateWiseMealTemplate" },
  { menu: "Amenity Master", route: "/master/amenityMaster" },
  { menu: "Key Master", route: "/master/keyMaster" },
  { menu: "Room Master", route: "/master/roomMaster" },
  { menu: "Room Category", route: "/master/roomCategory" },
  { menu: "Disease Master", route: "/master/diseaseMaster" },
  { menu: "Treatment Master", route: "/master/treatmentMaster" },
  { menu: "Therapy Type Master", route: "/master/therapyTypeMaster" },
  { menu: "Therapy Slot Master", route: "/master/therapySlotMaster" },
  { menu: "Membership Master", route: "/master/memberShipMaster" },
  {
    menu: "Holiday",
    route: "/master/holidayMaster",
  },
  {
    menu: "GPS Track",
    route: "/gps/gpsTrack",
  },
  {
    menu: "Manager vs Team",
    route: "/gps/managerVsTeam",
  },
  {
    menu: "DCR",
    route: "/employee/DCR",
  },
  {
    menu: "Leave",
    route: "/employee/applyLeave",
  },
  {
    menu: "Target",
    route: "/employee/targetMaster",
  },
  {
    menu: "Filled Expense",
    route: "/employee/expense",
  },
  {
    menu: "User Panel",
    route: "/manage/userPanel",
  },
  {
    menu: "Update Points",
    route: "/manage/updatePoints",
  },
  {
    menu: "Merge Route",
    route: "/route/mergeRoute",
  },
  {
    menu: "Assign Stockist",
    route: "/route/assignStockistToEmployee",
  },
  {
    menu: "Assign Chemist",
    route: "/route/assignChemistToRoute",
  },
  {
    menu: "Emp Route",
    route: "/route/empRoute",
  },
  { menu: "State", route: "/master/state" },
  { menu: "Division", route: "/master/division" },
  { menu: "Location Master", route: "/master/locationMaster" },
  { menu: "Treatment Plan", route: "/master/treatmentPlan" },
  { menu: "Meal Template", route: "/master/mealTemplate" },
  { menu: "Treatment Room Master", route: "/master/treatmentRoomMaster" },
  { menu: "Designation", route: "/master/designation" },
  { menu: "City", route: "/master/city" },
  { menu: "Area", route: "/master/area" },
  { menu: "Employee", route: "/master/employee" },
  { menu: "Diet Master", route: "/master/DietMaster" },

  { menu: "Room Rate Master", route: "/master/RoomRateMaster" },

  { menu: "Treatment Template Master", route: "/master/treatementtempletemaster" },
  { menu: "Stockist", route: "/master/stockist" },
  { menu: "Chemist", route: "/master/chemist" },
  { menu: "Item", route: "/master/item" },
  { menu: "Item Price", route: "/master/itemPrice" },
  { menu: "Scheme", route: "/master/scheme" },
  { menu: "Device Configuration", route: "/master/deviceConfiguration" },
  { menu: "Expense Configuration", route: "/master/expenseConfiguration" },
  { menu: "Assign Route", route: "/route/assignRoute" },
  { menu: "SL Tour Plan", route: "/tourPlan/slTourPlan" },
  { menu: "Manager Tour Plan", route: "/tourPlan/managerTourPlan" },
  { menu: "Mobile News", route: "/messaging/BroadcastMobileNews" },
  { menu: "Notification", route: "/messaging/AddBroadcast" },
  { menu: "Unlock DCR", route: "/manage/unlockDCR" },
  { menu: "Expense", route: "/approval/expense" },
  { menu: "Manage DCR", route: "/approval/manageDCR" },
  { menu: "Tour Plan", route: "/approval/tp" },
  { menu: "Chemist Profile", route: "/approval/chemistProfileUpdate" },
  { menu: "Leave Approval", route: "/approval/leaveApproval" },
  { menu: "TP vs Auto vs DCR", route: "/reports/TPvsAutovsDCRReport" },
  { menu: "Leave Report", route: "/reports/leaveReport" },
  { menu: "Daily Therapy", route: "/master/dailyTherapyMaster" },
  {
    menu: "Chemist Cumulative Productive Calls",
    route: "/reports/chemistCumulativeProductiveCalls",
  },
  {
    menu: "Transfer Route",
    route: "/route/transferRoutesToEmployee",
  },
  {
    menu: "TP Vs Actual Route",
    route: "/reports/tpVsActualRouteReport",
  },
  {
    menu: "Chemist Visits",
    route: "/reports/chemistvisit",
  },
  {
    menu: "Attendance",
    route: "/reports/attendance",
  },
  {
    menu: "Registration",
    route: "/approval/registration",
  },
  {
    menu: "Registration",
    route: "/approval/registration",
  },
  {
    menu: "Advertise",
    route: "/manage/advertise",
  },
  {
    menu: "Reward",
    route: "/master/reward",
  },
  {
    menu: "Invoice",
    route: "/sales/invoice",
  },
  {
    menu: "Redemption",
    route: "/approval/redemption",
  },
  {
    menu: "Order Status",
    route: "/sales/orderStatus",
  },
  {
    menu: "Expense Summary",
    route: "/reports/monthlyExpenseSummary",
  },
  {
    menu: "Series",
    route: "/manage/videoSeriesMaster",
  },
  {
    menu: "Video",
    route: "/manage/videoMaster",
  },
  {
    menu: "T & C",
    route: "/manage/tandc",
  },
  {
    menu: "Document Type",
    route: "/master/documentType",
  },
  {
    menu: "Video Summary",
    route: "/reports/videoSummary",
  },
  {
    menu: "Feature",
    route: "/manage/feature",
  },
  {
    menu: "Selfie",
    route: "/approval/selfie",
  },
  {
    menu: "Question Type",
    route: "/survey/questionType",
  },
  {
    menu: "Survey Master",
    route: "/survey/surveyMaster",
  },
  {
    menu: "Survey Report",
    route: "/survey/surveyReport",
  },
  {
    menu: "Point Config",
    route: "/manage/pointsConfig",
  },
  {
    menu: "Menu Role",
    route: "/manage/menuRole",
  },
  {
    menu: "Customer Order",
    route: "/sales/customerOrder",
  },
  {
    menu: "My Order",
    route: "/sales/myOrder",
  },
  {
    menu: "Secondary Sales", //L166549
    route: "/manage/defaultSecondary",
  },
  {
    menu: "Reward Vs claim",
    route: "/reports/claimReward",
  },
  {
    menu: "Item Wise Sales",
    route: "/reports/itemWiseSales",
  },
  {
    menu: "Top Customer",
    route: "/reports/TopCustomer",
  },
  {
    menu: "Primary Purchase",
    route: "/manage/primaryPurchase",
  },
  {
    menu: "GPS SMS Track",
    route: "/gps/gpsSmsTrack",
  },
  {
    menu: "Primary Vs Secondary",
    route: "/reports/primaryVsSecondary",
  },
  {
    menu: "Smart Setu App",
    route: "/reports/smartSetuApp",
  },
  {
    menu: "Primary Vs Claim",
    route: "/reports/primaryVsClaim",
  },
  {
    menu: "Employee Ref Mapping",
    route: "/reports/employeeRefMapping",
  },
  {
    menu: "QR",
    route: "/master/qr",
  },
  {
    menu: "Closing Stock",
    route: "/reports/closingStock",
  },
  {
    menu: "Sales",
    route: "/reports/sales",
  },
  {
    menu: "Outstanding",
    route: "/reports/outstanding",
  },
  { menu: "Manage Guest", route: "/manage/guest" },
  { menu: "Treatment", route: "/manage/treatment" },
  { menu: "Room Tariff", route: "/master/roomTariff" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "50px",
    "& header": {
      position: "relative",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  logoDrawer: {
    objectFit: "contain",
    width: "100%",
    overflow: "hidden",
    minHeight: "89px",
    cursor: "pointer",
  },
  sidebarItem: {
    "&:hover": {
      backgroundColor: "#fff1f2",
    },
    flexDirection: "row-reverse",
    "& .MuiListItem-button:hover": {
      background: "none",
    },
  },
  sidebarItemRoot: {
    "&:focus>.MuiTreeItem-content": {
      backgroundColor: "#659F1C",
    },
  },
  sidebarItemActive: {
    color: "#ffffff",
    flexDirection: "row-reverse",
    backgroundColor: "#969b4a",
    "&:hover": {
      backgroundColor: "#659F1C",
    },
    "& img": {
      filter: "brightness(100) contrast(1)",
      minHeight: "15px",
      minWidth: "15px",
    },
    "& .MuiListItem-button:hover": {
      background: "none",
    },
  },
  sidebarChildItemActive: {
    paddingLeft: "50px",
    backgroundColor: "#a0d959",
    "&:hover": {
      backgroundColor: "#659F1C",
    },
  },
  profileMenuItemActive: {
    backgroundColor: "#a0d959",
    "&:hover": {
      backgroundColor: "#659F1C",
    },
  },
  sidebarImage: {
    marginRight: "6px",
    filter: "brightness(0)",
    minHeight: "15px",
    minWidth: "15px",
  },
  subMenuList: {
    marginLeft: 0,
  },
  subMenuListItem: {
    paddingLeft: "50px",
    "&:hover": {
      backgroundColor: "#fff1f2",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none",
    maxHeight: "89px",
  },
  appBarShift: {
    marginLeft: `calc(${drawerWidth}px - 50px)`,
    width: `calc(100% - ${drawerWidth}px + 50px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: "none",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      width: "100%",
    },
  },
  menuButton: {
    marginRight: -3,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      width: 0,
    },
    border: "none",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: "0px 0px 32px rgba(0,0,0,0.15)",
    zIndex: "1203",
    border: "none",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: "50px",
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1
    // }
    "& .sidebar-text": {
      opacity: 0,
    },
    "& .MuiTreeItem-iconContainer": {
      display: "none",
    },
    boxShadow: "0px 0px 32px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("xs")]: {
      width: 0,
    },
    border: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    flexDirection: "row-reverse",
  },
  textNode: {
    whiteSpace: "normal",
    line: "1.2",
  },
  customToolbar: {
    minHeight: "89px",
  },
  mainContent: {
    flexGrow: 1,
    paddingLeft: `calc(${drawerWidth}px - 50px)`,
    // zIndex: 1201,
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
    },
  },
  mainContentOpen: {
    paddingLeft: "0",
  },
}));

export default function MiniDrawer(props = {}) {
  const classes = useStyles();
  const theme = useTheme();
  const { currentMenu = {}, userName = "" } = props;
  const selectedMenu =
    currentMenu && currentMenu.parent && currentMenu.menuSequence
      ? [currentMenu.parent, currentMenu.menuSequence]
      : ["0"];
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(selectedMenu);

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openChangePwdDialog, setChangePwdDialog] = useState(false);
  const [openProfileDialog, setProfileDialog] = useState(false);
  const [openNotificationMenu, setOpenNotificationMenu] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const anchorRef = useRef(null);
  const anchorRefNotification = useRef(null);
  const [displayMessage, setDisplayMessage] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotificationCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setExpanded(selectedMenu);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setExpanded(["0"]);
  };

  const handleNodeChange = (event, nodes) => {
    // Function to collapse treemenu //
    nodes.splice(1, 1);
    setExpanded(nodes);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openProfileMenu);
  useEffect(() => {
    if (prevOpen.current === true && openProfileMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openProfileMenu;
  }, [openProfileMenu]);

  useEffect(() => {
    if (prevOpen.current === true && openNotificationMenu === false) {
      anchorRefNotification.current.focus();
    }

    prevOpen.current = openNotificationMenu;
  }, [openNotificationMenu]);

  const handleProfileMenuToggle = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const handleNotificationMenuToggle = () => {
    setOpenNotificationMenu(!openNotificationMenu);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenProfileMenu(false);
  };

  const handleCloseNotification = (event) => {
    if (
      anchorRefNotification.current &&
      anchorRefNotification.current.contains(event.target)
    ) {
      return;
    }
    setOpenNotificationMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenProfileMenu(false);
    }
  }

  const doLogout = (event) => {
    handleClose(event);
    setLoading(true);
    props.userLogout();
    setLoading(false);
  };

  const getNotificationCount = () => {
    setTotalNotifications(0);
    /*
    props.getNotificationCount({
      onSuccess: (response) => {
        const { notificationCount = 0 } = response;
        setTotalNotifications(notificationCount);
      },
      onFailure: () => {
        setTotalNotifications(0);
      },
    });
    */
  };

  // const getInitials = (name) => {
  //   let initials = "";
  //   name.split(" ").map((subName) => (initials = initials + subName[0]));
  //   return initials;
  // };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        position="relative"
      >
        <Toolbar className="main-header">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="d-flex align-items-center">
              <IconButton
                onClick={handleDrawerOpen}
                className="responsive-menu-button"
              >
                <MenuIcon />
              </IconButton>
              <Typography className="main-title">
                {currentMenu && currentMenu.menuName
                  ? currentMenu.menuName
                  : "Dashboard"}
              </Typography>
            </div>
            <div className="d-flex align-items-center">
              <MenuItem
                ref={anchorRefNotification}
                onClick={handleNotificationMenuToggle}
                className="d-flex align-items-center ml-3"
              >
                {/* <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                  className="has-notifications"
                  size="small"
                > */}
                <Notifications className="has-notifications" />
                {totalNotifications !== 0 && (
                  <small>{totalNotifications} </small>
                )}
                {/* </IconButton> */}
              </MenuItem>
              <Popper
                open={openNotificationMenu}
                anchorEl={anchorRefNotification.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseNotification}>
                        <MenuList
                          autoFocusItem={openNotificationMenu}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <React.Fragment>
                            {openNotificationMenu && (
                              <NotificationsList
                                setDisplayMessage={setDisplayMessage}
                                setTotalNotifications={setTotalNotifications}
                              />
                            )}
                          </React.Fragment>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <MenuItem
                ref={anchorRef}
                onClick={handleProfileMenuToggle}
                className="d-flex align-items-center pipe-before ml-3"
              >
                <span className="">{userName}</span>
                <ExpandMore className="" />
                {/* <div className="user-initials-icon">
                  {getInitials(userName)}
                </div> */}
              </MenuItem>
              <Popper
                open={openProfileMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openProfileMenu}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={(e) => {
                              setProfileDialog(true);
                              handleClose(e);
                            }}
                            className={
                              openProfileDialog
                                ? classes.profileMenuItemActive
                                : ""
                            }
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setChangePwdDialog(true);
                              handleClose(e);
                            }}
                            className={
                              openChangePwdDialog
                                ? classes.profileMenuItemActive
                                : ""
                            }
                          >
                            Change Password
                          </MenuItem>
                          <MenuItem onClick={doLogout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img
            className={classes.logoDrawer}
            src={logo}
            alt=""
            onClick={() => {
              const { history } = props;
              history.push("/dashboard");
              props.setCurrentMenu({});
              setExpanded(["0"]);
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft className="drawer-close-responsive-display" />
            {theme.direction === "rtl" ? (
              <ChevronRight />
            ) : (
              <MenuIcon className="drawer-close-responsive-hide" />
            )}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <ChevronRight />
          </IconButton>
        </div>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          expanded={expanded}
          onNodeToggle={handleNodeChange}
          className="mainDrawer"
        >
          {props.menuItems &&
            props.menuItems.map((i, index) => (
              // Parent menu items //
              <TreeItem
                key={index}
                nodeId={i.parent}
                label={
                  <ListItem
                    // button
                    // classes={{
                    //   root:
                    //     currentMenu && currentMenu.parent === i.parent
                    //       ? classes.sidebarItemActive
                    //       : classes.sidebarItem
                    // }}
                    onClick={() => {
                      handleDrawerOpen();
                    }}
                  >
                    <img
                      src={require("../../../Images/" + i.parent + ".svg")}
                      alt=""
                      className={classes.sidebarImage}
                    ></img>
                    <ListItemText primary={i.parent} className="sidebar-text" />
                  </ListItem>
                }
                classes={{
                  root:
                    currentMenu && currentMenu.parent === i.parent
                      ? classes.sidebarItemRoot
                      : "",
                  content:
                    currentMenu && currentMenu.parent === i.parent
                      ? classes.sidebarItemActive
                      : classes.sidebarItem,
                  group: classes.subMenuList,
                }}
              >
                {i.child.map((c) => (
                  // Child menu items //
                  <TreeItem
                    key={c.childMenuSequence}
                    classes={{
                      content:
                        currentMenu &&
                          currentMenu.parent === i.parent &&
                          currentMenu.menuSequence ===
                          c.childMenuSequence.toString()
                          ? classes.sidebarChildItemActive
                          : classes.subMenuListItem,
                    }}
                    nodeId={c.childMenuSequence.toString()}
                    label={
                      <ListItemText
                        onClick={() => {
                          getNotificationCount();
                          const { history } = props;
                          const route = menuRoutes.filter(
                            (menuItem) => menuItem.menu === c.childMenu
                          );

                          const routePath =
                            route && route[0] && route[0].route
                              ? route[0].route
                              : "/dashboard";

                          history.push(routePath);
                          props.setCurrentMenu({
                            menuName: c.childMenu,
                            parent: i.parent,
                            menuSequence: c.childMenuSequence.toString(),
                            operationRights: c.operationRights,
                          });
                        }}
                        classes={{
                          primary: classes.textNode,
                        }}
                      >
                        {c.childMenu}
                      </ListItemText>
                    }
                  ></TreeItem>
                ))}
              </TreeItem>
            ))}
        </TreeView>
      </Drawer>
      <main
        className={clsx(classes.mainContent, {
          [classes.mainContentOpen]: !open,
        })}
      >
        <div className="main-section-wrapper">
          <MainPageRouter
            {...props}
            closeDrawer={handleDrawerClose}
            openDrawer={handleDrawerOpen}
          />
        </div>
      </main>
      {openChangePwdDialog && (
        <ChangePassword
          setChangePwdDialog={setChangePwdDialog}
          setDisplayMessage={setDisplayMessage}
        />
      )}
      {openProfileDialog && (
        <UserProfile
          setProfileDialog={setProfileDialog}
          setDisplayMessage={setDisplayMessage}
        />
      )}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />

      {loading && <Loading />}
    </div>
  );
}
