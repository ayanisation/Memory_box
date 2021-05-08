import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Feed from "./components/Feed";
import User from "./components/User";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Forms from "./components/Forms";
import { decode } from "jsonwebtoken";
import { useDispatch } from "react-redux";
import Searchusers from "./components/Searchusers";
import Searchposts from "./components/Searchposts";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch({ type: "LOGOUT" });
    }
  }

  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Signup} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/user" component={User} />
      <Route exact path="/user/liked" component={User} />
      <Route exact path="/user/disliked" component={User} />
      <Route exact path="/user/:username" component={User} />
      <Route exact path="/populate" component={Forms} />
      <Route exact path="/populate/:id" component={Forms} />
      <Route exact path="/searchUsers" component={Searchusers} />
      <Route exact path="/searchPosts" component={Searchposts} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
