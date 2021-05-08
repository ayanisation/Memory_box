import {
  Paper,
  TextField,
  Button,
  Container,
  Grow,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../actions/postAction";
import Common from "./Common";
import { useHistory, useParams } from "react-router";
import Menus from "./Menus";

const useStyles =  makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  textField: {
    marginTop: 6,
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    background: "#79CDCD",
    fontFamily: "Copperplate Papyrus",
  },
  buttonClear: {
    fontWeight: "bold",
    fontFamily: "Copperplate Papyrus",
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    background: "grey",
  },
  buttonCancel: {
    fontWeight: "bold",
    fontFamily: "Copperplate Papyrus",
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    background: "#ed1c24",
  },
}));

const Forms = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const date = new Date().toISOString();

  const [img, setImg] = useState(
    "https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png"
  );

  const post = useSelector((state) =>
    id ? state.posts.find((post) => post._id === id) : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
      setImg(post?.selectedFile);
    }
  }, [post]);

  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) history.push("/");
  const username = user.username;
  const [clicked, setClicked] = useState(false);

  const [postData, setPostData] = useState({
    creator: username,
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    createdAt: date,
  });

  const updateData = (e) => {
    setPostData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clearForm = () => {
    setPostData({
      creator: username,
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      createdAt: date,
    });
    setImg("https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png");
  };

  const populate = async (e) => {
    e.preventDefault();

    if (postData.title === "") alert("Please enter a post title");
    else if (postData.selectedFile === "") alert("Please upload an image");
    else {
      console.log(postData.tags);
      setClicked(true);
      let uploaded;
      if (id) uploaded = await dispatch(updatePost(id, postData));
      else uploaded = await dispatch(createPost(postData));
      if (uploaded) history.push("/feed");
      else alert("Upload Failed!");
      setClicked(false);
    }
  };
  return (
    <>
      <Common title={id ? "Edit post" : "Add post"} />
      <Grow in>
        <Container maxWidth="sm" style={{ marginTop: 120, marginBottom: 60 }}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                style={{ maxHeight: "30vh", maxWidth: "50vw" }}
                src={img}
                alt="Oops!"
              />
            </div>
            <form autoComplete="off" noValidate className={classes.form}>
              <TextField
                className={classes.textField}
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="message"
                variant="outlined"
                label="Caption"
                fullWidth
                value={postData.message}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={updateData}
              ></TextField>
              <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setImg(base64);
                    setPostData({ ...postData, selectedFile: base64 });
                  }}
                ></FileBase>
              </div>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                onClick={populate}
              >
                Post
              </Button>
              <Button
                className={classes.buttonClear}
                variant="contained"
                size="small"
                fullWidth
                onClick={clearForm}
              >
                clear
              </Button>
              <Button
                className={classes.buttonCancel}
                variant="contained"
                size="small"
                fullWidth
                onClick={() => {
                  history.push("/feed");
                }}
              >
                Cancel
              </Button>
            </form>
            {clicked ? <LinearProgress /> : <></>}
          </Paper>
        </Container>
      </Grow>
      <Menus parent="populate" />
    </>
  );
};

export default Forms;
