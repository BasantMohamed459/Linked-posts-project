import { Button, Card, CardBody, CardHeader, Image } from "@heroui/react";
import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/postService";
import LoadingScreen from "../Components/LoadingScreen";
import CreatePost from "../Components/CreatePost";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllPosts() {
    setIsLoading(true);
    const response = await getAllPostsApi();
    setPosts(response.posts);
    setIsLoading(false);
  }
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="w-4/6 mx-auto ">
        {/* create post */}
        <CreatePost callback={getAllPosts} />

        {/* <LoadingScreen /> */}

        {isLoading ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              commentLimit={1}
              callback={getAllPosts}
            />
          ))
        )}
      </div>
    </>
  );
}

export default FeedPage;
