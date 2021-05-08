import { Container, Grid, Grow } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { getUsers } from "../actions/authAction";
import { getPosts } from "../actions/postAction";
import Menus from "./Menus";
import Common from "./Common";
import Posts from "./Posts";

const User = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { username } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) history.push("/");
  const currentUser = user.username;
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);
  let posts = useSelector((state) => state.posts);
  let parent = "user";

  const dispUser = username ? username : currentUser;
  if (dispUser === currentUser) {
    if (location.pathname === "/user/liked") {
      posts = posts.filter((post) => post.likes.indexOf(currentUser) > -1);
      parent = "liked";
    } else if (location.pathname === "/user/disliked") {
      posts = posts.filter((post) => post.dislikes.indexOf(currentUser) > -1);
      parent = "disliked";
    } else posts = posts.filter((post) => post.creator === currentUser);
  } else posts = posts.filter((post) => post.creator === dispUser);
  return (
    <>
      <Common title={dispUser} />
      <Container maxWidth="lg">
        <Grow in>
          <Container style={{ marginTop: 60, marginBottom: 60 }}>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={5}
            >
              <Posts parent={parent} username={dispUser} posts={posts} />
            </Grid>
          </Container>
        </Grow>
      </Container>
      <Menus parent="user" />
    </>
  );
};

export default User;
