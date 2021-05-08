import {
  AppBar,
  Container,
  Grow,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { AccountCircle, SearchOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/authAction";
import Menus from "./Menus";
import Common from "./Common";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icons: {
    padding: theme.spacing(0, 2),
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
}));

const Searchusers = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let [query, setQuery] = useState("");
  let users = [];
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  users = useSelector((state) => state.auth);
  if (users.length > 0) {
    users = users.filter(
      (user) =>
        user.username &&
        user.name &&
        (user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.name.toLowerCase().includes(query.toLowerCase()))
    );
  }

  const searchUsers = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <Common parent="searcher" title="Find Users" />
      <Grow in>
        <AppBar
          style={{
            position: "fixed",
            top: 50,
            alignItems: "center",
            background: "black",
            padding: 20,
          }}
        >
          <Paper style={{ padding: 10, display: "flex" }}>
            <div className={classes.icons}>
              <SearchOutlined />
            </div>
            <InputBase
              autoComplete="off"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
              }}
              name="query"
              value={query}
              onChange={searchUsers}
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </AppBar>
      </Grow>
      <Container maxWidth="sm" style={{ marginTop: 135, marginBottom: 65 }}>
        {query ? (
          users.length === 0 ? (
            <Typography variant="h5" align="center">
              No Matches
            </Typography>
          ) : (
            users.map((user) => (
              <Paper
                key={user.id}
                style={{
                  background: "black",
                  marginTop: 10,
                  borderRadius: 50,
                  display: "flex",
                  padding: 10,
                }}
                component={Link}
                to={`/user/${user.username}`}
              >
                <div className={classes.icons}>
                  <AccountCircle style={{ color: "#ffffff" }} />
                </div>
                <Typography
                  variant="body1"
                  align="center"
                  style={{ color: "#ffffff", marginRight: 10 }}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  style={{ color: "#ffffff" }}
                >
                  ({user.name})
                </Typography>
              </Paper>
            ))
          )
        ) : (
          <></>
        )}
      </Container>
      <Menus parent="search" />
    </>
  );
};

export default Searchusers;
