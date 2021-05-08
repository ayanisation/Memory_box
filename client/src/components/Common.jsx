import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Container, IconButton } from "@material-ui/core";
import { ExitToApp, SearchOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  appBar2: {
    top: 50,
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  heading: {
    color: "#C2936E",
    fontWeight: "bold",
  },
  image: {
    marginLeft: "15px",
  },
}));

export default function Common(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    if (window.confirm("Are you sure you wish to Logout")) {
      dispatch({ type: "LOGOUT" });
      history.push("/");
    }
  };
  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">
            {props.title}
          </Typography>
        </AppBar>
        {props.title !== "User Login" &&
        props.title !== "Sign Up with MemB" &&
        props.title !== "Memory Box" ? (
          <AppBar position="fixed" className={classes.appBar2}>
            <IconButton onClick={logout} title="Logout">
              <ExitToApp style={{ color: "FFFFFF" }} />
            </IconButton>
            <div style={{ display: "flex" }}>
              <IconButton
                component={Link}
                to="/searchUsers"
                title="Search Users"
              >
                <SearchOutlined style={{ color: "FFFFFF" }} />
              </IconButton>
              <IconButton
                component={Link}
                to="/searchPosts"
                title="Search Posts"
              >
                <ImageSearchIcon style={{ color: "FFFFFF" }} />
              </IconButton>
            </div>
          </AppBar>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
