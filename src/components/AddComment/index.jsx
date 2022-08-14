import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({ data, user }) => {
  const { id } = useParams();
  console.log(data);
  const [comment, setComment] = useState("");
  const avatarUrl = user.avatarUrl;
  const fullName = user.fullName;
  const onChangeValue = useCallback((value) => {
    setComment(value);
  }, []);

  const onClickAddCommnet = async () => {
    const fields = {
      comments: [
        {
          comment,
          avatarUrl,
          fullName,
        },
      ],
    };
    console.log(fields);
    await axios.patch(`/posts/${id}`, fields);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => onChangeValue(e.target.value)}
          />
          <Button variant="contained" onClick={onClickAddCommnet}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
