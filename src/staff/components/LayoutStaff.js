import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountMenu from "../../components/AccountMenu";

const drawerWidth = 240;

const redirectLink = "/staff/account"

export default function LayoutStaff() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#199a8e" }}
          >
            
            <Toolbar style={{justifyContent:'space-between'}}>
              <Typography variant="h6" noWrap component="div">
                WeCare
              </Typography>
              <AccountMenu redirectLink={redirectLink}/>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItemButton component={Link} to="/staff">
                  <ListItemIcon>
                    {" "}
                    <DashboardIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>

              <Divider />

                <ListItemButton component={Link} to="/staff/accounts">
                  <ListItemIcon>
                    {" "}
                    <DashboardIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="All Staff Accounts" />
                </ListItemButton>

                <ListItemButton component={Link} to="/staff/accounts/create">
                  <ListItemIcon>
                    {" "}
                    <PersonAddIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Create Staff Account" />
                </ListItemButton>
                <Divider />

                <ListItemButton component={Link} to="/staff/patients">
                  <ListItemIcon>
                    {" "}
                    <DashboardIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="All Patients" />
                </ListItemButton>

                <Divider />

                <ListItemButton component={Link} to="/staff/users">
                  <ListItemIcon>
                    {" "}
                    <DashboardIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="All User Accounts" />
                </ListItemButton>
                <Divider />
                
                <ListItemButton component={Link} to="/staff/records">
                  <ListItemIcon>
                    {" "}
                    <DashboardIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="All Health Records" />
                </ListItemButton>

                <ListItemButton component={Link} to="/staff/records/create">
                  <ListItemIcon>
                    {" "}
                    <DashboardIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Create Health Record" />
                </ListItemButton>

            </List>
            </Box>
          </Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
