import * as api from "../api/index";

//action creator
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_POSTS", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    post.tags = post.tags.toLowerCase();
    const { data } = await api.addPost(post);
    dispatch({ type: "CREATE_POST", payload: data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.update(id, post);
    dispatch({ type: "UPDATE_POST", payload: data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const likePost = (id, username) => async (dispatch) => {
  try {
    const { data } = await api.like(id, { username: username });
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = (id, username) => async (dispatch) => {
  try {
    const { data } = await api.dislike(id, { username: username });
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delPost(id);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    console.log(error);
  }
};
