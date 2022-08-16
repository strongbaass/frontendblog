import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkDown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState();
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4444/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []);

  useEffect(
    () => {
      const fetchComments = async () => {
        await axios.get(`http://localhost:4444/comments/${id}`).then((res) => {
          setComments(res.data);
        });
      };
      fetchComments().catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
    },
    [],
    isLoading
  );

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `http://localhost:4444${data.imageUrl}`
            : data.imageUrl
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkDown children={data.text} />
      </Post>

      {!comments ? null : (
        <CommentsBlock comments={comments} isLoading={false} />
      )}

      <Index data={data} user={data.user} />
    </>
  );
};
