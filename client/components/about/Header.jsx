import { useState } from "react";
import Language from "../language/Language";
import constants from "../../../utilities/constants";
import { Box, Drawer, List, Typography, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { Menu, ArrowCircleRight, Info, Bolt, Work, WorkHistory, School, Badge, Business, Help } from "@mui/icons-material";

const Header = (props) => {
  const { onScroll } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const icons = [<Info />, <Bolt />, <Work />, <WorkHistory />, <School />, <Badge />, <Business />, <Help />];

  const toggleSidebar = (type, event) => {
    if ((event.type === "keydown") && ((event.key === "Tab") || (event.key === "Shift"))) return;
    setIsSidebarOpen(type);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right", position: "relative", zIndex: "2", backgroundColor: "transparent" }}>
        <Typography sx={{ height: "24px", margin: "20px 20px 0px 0px" }}><Language /></Typography>
        <Typography><Menu sx={{ color: "#fff", margin: "20px 20px 0px 0px", cursor: "pointer" }} onClick={(event) => toggleSidebar(true, event)} /></Typography>
      </Box>
      {isSidebarOpen && (
        <Drawer anchor="right" open sx={{ "& .MuiDrawer-paper": { backgroundImage: "linear-gradient(to bottom, #054c04, #134103, #183603, #192b02, #182102)", color: "#fff" } }} onClose={(event) => toggleSidebar(false, event)}>
          <Box sx={{ width: "250px" }} role="presentation" onClick={(event) => toggleSidebar(false, event)} onKeyDown={(event) => toggleLeftNavigation(false, event)}>
            <List>
              <>
                <ListItem onClick={(event) => toggleSidebar(false, event)} disablePadding>
                  <ListItemButton><ArrowCircleRight /></ListItemButton>
                </ListItem>
                <Divider sx={{ borderColor: "#fff" }} />
                {constants.ABOUT_SECTIONS.map((section, index) => (
                  <ListItem key={section} disablePadding>
                    <ListItemButton onClick={() => onScroll(section)}>
                      <ListItemIcon sx={{ color: "#fff" }}>{icons[index]}</ListItemIcon>
                      <ListItemText primary={section} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Header;
