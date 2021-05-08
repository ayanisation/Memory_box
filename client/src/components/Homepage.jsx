import {
  Container,
  Paper,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import Common from "./Common";

const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#e50000",
    fontWeight: "bold",
  },
  paper: {
    borderRadius: 15,
    padding: "100px 0",
    background: "black",
  },
  buttonSignup: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 60,
    background: "#79CDCD",
  },
  buttonLogin: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    background: "#66cd00",
  },
  image: {
    marginLeft: "15px",
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user) history.push("/feed");
  return (
    <>
      <Common title="Memory Box"/>
      <Container maxWidth="sm" align="center" style={{marginTop:50}}>
        <Paper className={classes.paper}>
          <Typography
            style={{ fontWeight: "bold" , color:"#C2936E" }}
            variant="h5"
            align="center"
          >
            New User ?
          </Typography>
          <NavLink style={{ textDecoration: "none" }} to="/register">
            <Button
              className={classes.buttonSignup}
              variant="contained"
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
          </NavLink>
          <Typography
            style={{ fontWeight: "bold", marginBottom: 60, color:"#C2936E" }}
            variant="h4"
            align="center"
          >
            OR
          </Typography>
          <Typography
            style={{ fontWeight: "bold", color:"#C2936E" }}
            variant="h5"
            align="center"
          >
            Existing User ?
          </Typography>
          <NavLink style={{ textDecoration: "none" }} to="/login">
            <Button
              className={classes.buttonLogin}
              variant="contained"
              size="large"
              type="submit"
            >
              Log In
            </Button>
          </NavLink>
        </Paper>
      </Container>
    </>
  );
};

export default Homepage;
