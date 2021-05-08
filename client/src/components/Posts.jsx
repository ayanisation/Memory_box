import React from "react";
import Post from "./Post";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    padding: 40,
    marginTop: 25,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
}));

const Posts = (props) => {
  const posts = props.posts;
  const classes = useStyles();
  const parent = props.parent;
  const username = props.username;

  return !posts.length ? (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: 100,
      }}
    >
      {parent === "user" || parent === "liked" || parent === "disliked" ? (
        <Typography variant="h6">No posts to show</Typography>
      ) : (
        <CircularProgress />
      )}
    </Container>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={4}>
          <Post post={post} parent={parent} username={username} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
