import axios from "axios";

const API = axios.create({
   baseURL: "https://memory-box-server.herokuapp.com",
});

export const fetchPosts = () => API.get("/post");
export const addPost = (newPost) => API.post("/post", newPost);
export const update = (id, post) => API.patch(`/post/${id}/update`, post);
export const like = (id, username) => API.patch(`/post/${id}/like`, username);
export const dislike = (id, username) => API.patch(`/post/${id}/dislike`, username);
export const delPost = (id) => API.delete(`/post/${id}/delete`);

export const findUser = (user) => API.post("/auth/signin", user);
export const addUser = (newUser) => API.post("/auth/signup", newUser);
export const fetchUsers = () => API.get("/auth");
