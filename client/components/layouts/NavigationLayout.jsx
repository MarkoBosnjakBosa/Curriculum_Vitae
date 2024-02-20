import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utilities/api";
import { get, logout } from "../../utilities/authentication";
import { validObjectId, validObject } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import { Box, Typography, Menu, MenuItem, Tooltip, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Settings, Security, Lock, Logout, Bolt, Work, WorkHistory, Badge, Group } from "@mui/icons-material";

const NavigationLayout = (props) => {
  const [avatar, setAvatar] = useState(props.avatar || {});
  const { username } = get();
  const navigate = useNavigate();
  const icons = [<Bolt />, <Work />, <WorkHistory />, <Badge />, <Group />];
  const [anchor, setAnchor] = useState(null);
  const isOpen = Boolean(anchor);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const avatar = await loader();
      if (validObject(avatar)) setAvatar(avatar);
    };
    loadData();
  }, []);

  const toggleSidebar = (type, event) => {
    if ((event.type === "keydown") && ((event.key === "Tab") || (event.key === "Shift"))) return;
    setIsSidebarOpen(type);
  };

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "right", height: "42px", backgroundColor: "#f2f2f2" }}>
        <Typography sx={{ minWidth: "100px", cursor: "pointer" }} onClick={(event) => toggleSidebar(true, event)}>Settings</Typography>
        <Typography sx={{ minWidth: "100px", cursor: "pointer" }} onClick={() => navigate("/overview")}>Overview</Typography>
        <Tooltip title={`Settings for ${username}`}>
          <IconButton aria-controls={isOpen ? "menu" : undefined} aria-haspopup="true" aria-expanded={isOpen ? "true" : undefined} onClick={(event) => setAnchor(event.currentTarget)}>
            <Box src={avatar.data} alt={avatar.name} component="img" sx={{ width: "32px", height: "32px", borderRadius: "50%" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu anchorEl={anchor} id="menu" open={isOpen} onClose={() => setAnchor(null)} onClick={() => setAnchor(null)} PaperProps={{ elevation: 0, sx: { overflow: "visible", filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", mt: 1.5, "& .MuiAvatar-root": { width: "32px", height: "32px", ml: -0.5, mr: 1 }, "&:before": { content: "''", display: "block", position: "absolute", top: "0px", right: "14px", width: "10px", height: "10px", bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0 } } }} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => navigate("/profile")}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/password")}><ListItemIcon><Lock fontSize="small" /></ListItemIcon>Password</MenuItem>
        <MenuItem onClick={() => navigate("/setup")}><ListItemIcon><Security fontSize="small" /></ListItemIcon>Setup</MenuItem>
        <Divider />
        <MenuItem onClick={logoutUser}><ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout</MenuItem>
      </Menu>
      {isSidebarOpen && (
        <Drawer anchor="left" open onClose={(event) => toggleSidebar(false, event)}>
          <Box sx={{ width: "250px" }} role="presentation" onClick={(event) => toggleSidebar(false, event)} onKeyDown={(event) => toggleLeftNavigation(false, event)}>
            <List>
              {constants.ADMINISTRATOR_SECTIONS.map((section, index) => (
                <ListItem key={section} onClick={() => navigate(`/${section.toLowerCase()}`)} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={section} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default NavigationLayout;

const loader = async () => {
  const { userId } = get();
  if (validObjectId(userId)) {
    const { avatar } = await getData(`${window.location.origin}/getProfile/${userId}`);
    return avatar;
  } else {
    return {};
  }
};
