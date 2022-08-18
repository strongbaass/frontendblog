import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const Index = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const [comment, setComment] = useState("");
  const avatarUrl = userData.avatarUrl;
  const fullName = userData.fullName;

  const onChangeValue = useCallback((value) => {
    setComment(value);
  }, []);

  const onClickAddCommnet = async () => {
    const fields = {
      id,
      comments: {
        comment,
        avatarUrl,
        fullName,
      },
    };
    await axios.post(`/comments`, fields);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Enter comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => onChangeValue(e.target.value)}
          />
          <Button variant="contained" onClick={onClickAddCommnet}>
            Comment
          </Button>
        </div>
      </div>
    </>
  );
};
