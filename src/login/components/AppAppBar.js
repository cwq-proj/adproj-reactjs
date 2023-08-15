import * as React from "react";
// import AppBar from "../components/AppBar";
// import Toolbar from "../components/Toolbar";
import HeaderImg from "../../images/BioProspectIcon.png";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

export default function AppAppBar() {
  return (
    <div>
      {/* <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        
          <div style={{ flex: 1 }}></div>
          <img src={HeaderImg} alt="BioProspect Icon" style={{ width: '100px', height: '100px', flex: 'none', marginRight: '50px' }} />
        </Toolbar>
      </AppBar> */}

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#199a8e",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            WeCare
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
