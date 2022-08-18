import { Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { CommentsBlock, Post, TagsBlock } from "../../components";

export const SearchByTag = () => {
  const { id } = useParams();
  const [postsTags, setPostsTags] = useState();
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isTagsLoading, setisTagsLoading] = useState(true);
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {
    const fetchTagsByName = async () => {
      await axios.get(`http://localhost:4444/tags/${id}`).then((res) => {
        setPostsTags(res.data);
        setIsPostsLoading(false);
        setisTagsLoading(false);
      });
    };
    fetchTagsByName().catch((err) => {
      console.warn(err);
      alert("Ошибка при получении статей");
    });
  }, []);
  if (!postsTags) {
    return (
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {" "}
          <Post isLoading={true} />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : postsTags).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={null}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          {postsTags.map((obj, index) => {
            <TagsBlock items={obj.tags} isLoading={isTagsLoading} />;
          })}

          <CommentsBlock isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
