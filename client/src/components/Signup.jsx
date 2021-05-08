import {
  Button,
  Container,
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userSignup } from "../actions/authAction";
import Common from "./Common";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: 10,
    padding: theme.spacing(2),
    borderRadius: 15,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  textField: {
    marginTop: 20,
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
    background: "#79CDCD",
    fontFamily: "Copperplate Papyrus",
  },
  buttonLogin: {
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "#000",
    textDecoration: "none",
    fontFamily: "Copperplate Papyrus",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    confPass: "",
  });
  const [clicked, setClicked] = useState(false);
  let [visible, setVisible] = useState(false);
  const updateData = (e) => {
    setNewUser((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const newUserSignup = async (e) => {
    e.preventDefault();
    setClicked(true);
    if (newUser.password !== newUser.confPass) alert("Passwords do not match");
    else if (newUser.password.length < 8)
      alert("Password should be atleast 8 digits long");
    else {
      let verified = await dispatch(userSignup(newUser, history));
      if (verified) history.push("/feed");
      else alert("Username is taken. Try another");
    }
    setClicked(false);
  };
  return (
    <>
      <Common title="Sign Up with MemB" />
      <Grow in>
        <Container maxWidth="sm" style={{ marginTop: 50 }}>
          <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form}>
              <Typography variant="h6">New User</Typography>
              <TextField
                className={classes.textField}
                name="name"
                variant="outlined"
                label="Name"
                fullWidth
                value={newUser.name}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="username"
                variant="outlined"
                label="Username"
                fullWidth
                value={newUser.username}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="password"
                variant="outlined"
                label="Password"
                type={visible ? "text" : "password"}
                fullWidth
                value={newUser.password}
                onChange={updateData}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setVisible((preVisible) => !preVisible);
                        }}
                      >
                        {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                className={classes.textField}
                name="confPass"
                variant="outlined"
                type="password"
                label="Confirm Password"
                fullWidth
                value={newUser.confPass}
                onChange={updateData}
              ></TextField>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                onClick={newUserSignup}
              >
                Create User
              </Button>
              <Typography
                className={classes.buttonLogin}
                component={Link}
                to="/login"
                variant="body1"
                size="large"
                type="submit"
              >
                Already have an account ? Login here
              </Typography>
            </form>
            {clicked ? <LinearProgress /> : <></>}
          </Paper>
        </Container>
      </Grow>
    </>
  );
};

export default Signup;
