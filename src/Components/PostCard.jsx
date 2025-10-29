import React, { useContext } from "react";
import Comment from "./Comment";
import PostHeader from "./Card/PostHeader";
import PostBody from "./Card/PostBody";
import PostFooter from "./Card/PostFooter";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { createCommentApi } from "../Services/commentServices";
import { authContext } from "../Context/AuthContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import PostForm from "./Card/PostForm";
import CreatePost from "./CreatePost";
import { deletePostApi } from "../Services/postService";

export default function PostCard({ post, commentLimit, callback }) {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { userData } = useContext(authContext);

  async function createComment(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await createCommentApi(commentContent, post.id);

    if (response.message) {
      await callback();
      setCommentContent("");
    }
    setIsLoading(false);
    console.log(response);

    console.log(commentContent);
  }
  async function deletePost(posttId) {
    setIsLoading(true);
    const response = await deletePostApi(posttId);
    if (response.message) {
      await callback();
    }
    setIsLoading(false);
    console.log(response);
  }

  return (
    <>
      {isUpdating ? (
        <CreatePost
          callback={callback}
          post={post}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      ) : (
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
          <div className="w-full h-16 flex items-center  justify-between ">
            {/* post header */}
            <PostHeader
              photo={post.user.photo}
              name={post.user.name}
              date={post.createdAt}
            />

            {userData?._id === post?.user?._id && (
              <>
                <Dropdown>
                  <DropdownTrigger>
                    <svg
                      className="w-16 cursor-pointer outline-0"
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
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={19} cy={12} r={1} />
                      <circle cx={5} cy={12} r={1} />
                    </svg>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit">
                      <div className="flex items-center gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                        {/* editing here */}
                        <span onClick={() => setIsUpdating(true)}>
                          Edit post
                        </span>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="copy">
                      <div className="flex items-center gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                        <span>Copy link</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      <div className="flex items-center gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span onClick={() => deletePost(post._id)}>
                          Move to trash
                        </span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
          </div>

          {/* post body */}
          <PostBody body={post.body} image={post.image} />

          {/* post footer */}
          <PostFooter postId={post.id} commentLength={post.comments.length} />

          {/* comment scope */}

          {post.comments.length > 0 &&
            post.comments
              .slice(0, commentLimit)
              .map((comment) => (
                <Comment
                  postUserId={post.user._id}
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                  callback={callback}
                />
              ))}
          {/* {post.comments.length > 0 && <Comment comment={post.comments[0]} />} */}

          {/* create comment */}
          <form
            onSubmit={createComment}
            action=""
            className="flex justify-between gap-3 mt-8"
          >
            <Input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              variant="bordered"
              type="text"
              placeholder="Write a comment..."
            />
            <Button
              isLoading={isLoading}
              type="submit"
              disabled={commentContent.length < 2}
              className="bg-blue-300"
            >
              Add Comment
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
