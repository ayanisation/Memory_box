import React, { useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "./Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postAction";

import Common from "./Common";
import Menus from "./Menus";
import { useHistory } from "react-router";

function Feed() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!user) history.push("/");
    else {
      dispatch(getPosts());
    }
  }, [dispatch, history, user]);

  let posts = useSelector((state) => state.posts);
  return (
    <>
      <Common title="Memories" />
      <Container maxWidth="lg">
        <Grow in>
          <Container style={{ marginTop: 60, marginBottom: 60 }}>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={5}
            >
              <Posts parent="feed" username={user.username} posts={posts} />
            </Grid>
          </Container>
        </Grow>
      </Container>
      <Menus parent="feed" />
    </>
  );
}

export default Feed;
