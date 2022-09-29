import { Button, Slide, useMediaQuery, useTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import AppToolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Toolbar.css";
import { Routes } from "../../service/config";
import LogoImage from "./../../images/icon.png";

export const title = "Northstar";

export const Toolbar = () => {
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Slide direction="down" in={true} timeout={800}>
      <AppBar position="sticky" className="AppBar" color="inherit">
        <AppToolbar>
          <div className="HeaderContainer">
            <div className="HeaderLeftContainer" onClick={() => history.push(Routes.home)}>
              {/* <AssignmentTurnedInIcon color='primary' className='HeaderIcon' /> */}
              <img
                alt="React Northstar App"
                style={{ height: "40px", width: "40px", transform: isSmallScreen ? "scale(0.5)" : "none" }}
                src={LogoImage}
              ></img>
              <Typography variant={isSmallScreen ? "subtitle1" : "h5"} color="inherit" noWrap>
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title="New Roadmap"
                startIcon={<AddCircleOutlineIcon />}
                color="primary"
                onClick={() => history.push(Routes.home)}
              >
                {!isSmallScreen ? "Create" : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? "small" : "large"}
                color="primary"
                onClick={() => history.push(Routes.explore)}
              >
                {!isSmallScreen ? "Explore" : null}
              </Button>
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
