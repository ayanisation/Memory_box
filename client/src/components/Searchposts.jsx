import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  Paper,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Posts from "./Posts";
import { useSelector } from "react-redux";

import Common from "./Common";
import Menus from "./Menus";
import { SearchOutlined } from "@material-ui/icons";

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
  appbar: {
    position: "fixed",
    top: 50,
    alignItems: "center",
    background: "black",
    padding: 20,
  },
}));

function Searchposts() {
  const classes = useStyles();

  let [query, setQuery] = useState("");

  const posts = useSelector((state) => state.posts);
  let filtered = [];

  const user = JSON.parse(localStorage.getItem("profile"));

  if (posts.length > 0)
    filtered = posts.filter((post) => post.tags.includes(query.toLowerCase()));

  const searchPosts = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Common title="Search Posts" />
      <Grow in>
        <AppBar className={classes.appbar}>
          <Container maxWidth="sm">
            <Paper style={{ padding: 10, display: "flex" }}>
              <div className={classes.icons}>
                <SearchOutlined />
              </div>
              <InputBase
                autoComplete="off"
                placeholder="Search by tags (don't use '#')"
                className={classes.inputRoot}
                fullWidth
                name="query"
                value={query}
                onChange={searchPosts}
                inputProps={{ "aria-label": "search" }}
              />
            </Paper>
          </Container>
        </AppBar>
      </Grow>
      <Container maxWidth="lg">
        {query ? (
          filtered.length === 0 ? (
            <Container style={{ marginTop: 130, marginBottom: 60 }}>
              <Typography variant="h5" align="center">
                No Matches
              </Typography>
            </Container>
          ) : (
            <Grow in>
              <Container style={{ marginTop: 80, marginBottom: 60 }}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="stretch"
                  spacing={5}
                >
                  <Posts
                    parent="searchPosts"
                    username={user.username}
                    posts={filtered}
                  />
                </Grid>
              </Container>
            </Grow>
          )
        ) : (
          <></>
        )}
      </Container>
      <Menus parent="searchPosts" />
    </>
  );
}

export default Searchposts;
