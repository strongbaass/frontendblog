import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { useLocation, useParams } from "react-router-dom";
import axios from "../axios";

export const Home = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userData = useSelector((state) => state.auth.data);
  const [postsTags, setPostsTags] = useState();
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  useEffect(() => {
    const fetchTagsByName = async () => {
      await axios.get(`http://localhost:4444/tags/${id}`).then((res) => {
        setPostsTags(res.data);
      });
    };
    fetchTagsByName().catch((err) => {
      console.warn(err);
      alert("Ошибка при получении статей");
    });
  }, []);

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
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              pathname !== `/tag/${id}` && (
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
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
