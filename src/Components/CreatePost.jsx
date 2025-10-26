import { Button, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { createPostApi, updatePostApi } from "../Services/postService";
import profileImage from "../assets/blue-circle-with-white-user_78370-4707.jpg";

export default function CreatePost({
  callback,
  post,
  isUpdating,
  setIsUpdating,
}) {
  const [postContent, setPostContent] = useState(post?.body ?? "");
  const [postImage, setPostImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(post?.image ?? "");
  const [isLoading, setIsLoading] = useState(false);

  async function urlToFile() {
    const response = await fetch(post.image);
    const data = await response.blob();
    let file = new File([data], "image", { type: "image/jpg" });
    setPostImage(file);
    console.log(file);

    // new File
  }
  useEffect(() => {
    urlToFile();
  }, []);

  function handleImageChange(e) {
    console.log(e.target.files[0]);
    setPostImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }

  async function createPost(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("body", postContent);
    formData.append("image", postImage);
    let response = await createPostApi(formData);

    if (isUpdating) {
      response = await updatePostApi(formData, post._id);
      setIsUpdating(false);
    } else {
      response = await createPostApi(formData);
    }

    if (response.message) {
      await callback();
      setPostContent("");
      setImageUrl("");
    }
    setIsLoading(false);

    console.log(postContent);
    console.log(postImage);
  }

  return (
    <>
      <div className="bg-white w-full  rounded-md shadow-md">
        <div className="w-full  flex items-start justify-between px-5">
          <img
            className=" rounded-full w-15 h-15 m-3"
            src={profileImage}
            alt=""
          />
          <form
            onSubmit={createPost}
            action=""
            className="flex justify-between flex-col gap-2 items-center w-full"
          >
            <div className=" w-full flex flex-col gap-2 mt-4">
              <Input
                type="text"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

              {imageUrl && (
                <div className="relative">
                  <img src={imageUrl} alt="post image" className="w-full" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute top-0 right-0 m-2 text-gray-400 cursor-pointer"
                    onClick={() => setImageUrl("")}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex gap-3 items-center">
              {isUpdating && (
                <Button
                  onPress={() => setIsUpdating(false)}
                  type="submit"
                  className="bg-gray-400 mt-2"
                >
                  Cancel
                </Button>
              )}
              <Button
                isLoading={isLoading}
                type="submit"
                className="bg-blue-300 mt-2"
              >
                POST
              </Button>
            </div>
          </form>
        </div>

        {/* three post options */}
        <div className="w-full h-16 flex justify-between px-3 md:px-10 lg:px-24 xl:px-5">
          <div className=" flex h-full items-center">
            <svg
              className="h-12 fill-current text-red-500 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              width={27}
              height={27}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z" />
            </svg>
            <span className="text-xs lg:text-md mx-2 font-semibold text-gray-500">
              {" "}
              Live Video broadcast{" "}
            </span>
          </div>
          <div className=" flex h-full items-center ">
            <svg
              className="h-12  text-green-500 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              width={27}
              height={27}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <rect x={3} y={3} width={18} height={18} rx={2} />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M20.4 14.5L16 10 4 20" />
            </svg>
            {/* <span className=""> </span> */}

            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-xs lg:text-md mx-2 font-semibold text-gray-500 hover:text-green-500"
            >
              Photo/Video
              <Input
                type="file"
                onChange={handleImageChange}
                id="fileUpload"
                className="hidden"
              />
            </label>
          </div>
          <div className=" flex h-full items-center">
            <svg
              className="h-12  text-yellow-500 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              width={27}
              height={27}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
              <circle cx={12} cy={10} r={3} />
              <circle cx={12} cy={12} r={10} />
            </svg>
            <span className="text-xs lg:text-md mx-2 font-semibold text-gray-500">
              {" "}
              Feeling/Activities{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
