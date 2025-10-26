import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  deleteCommentApi,
  getPostCommentsApi,
} from "../Services/commentServices";

export default function Comment({ comment, postUserId, postId, callback }) {
  const { userData } = useContext(authContext);
  const [isLoading, setIsLoading] = React.useState(false);

  async function deleteComment(commentId) {
    setIsLoading(true);
    const response = await deleteCommentApi(commentId);
    if (response.message) {
      await callback(getpostComments(postId));
    }
    setIsLoading(false);
    console.log(response);
  }

  async function getpostComments(postIdcomments) {
    const response = await getPostCommentsApi(postIdcomments);

    console.log(response);
  }

  return (
    <>
      <div className="bg-gray-200 p-5 -mx-4 -my-4 mt-3">
        <div className="w-full h-16 flex items-center  justify-between">
          <div className="flex">
            <img
              className=" rounded-full w-10 h-10 mr-3"
              src={comment.commentCreator.photo}
              alt={comment.commentCreator.name}
            />
            <div>
              <h3 className="text-md font-semibold ">
                {comment.commentCreator.name}
              </h3>
              <p className="text-xs text-gray-500 text-justify">
                {" "}
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {userData?._id === comment?.commentCreator?._id &&
            userData._id === postUserId && (
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
                        <span>Edit</span>
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
                          className="size-6 w-5 h-5 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                        <span>Copy</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      isLoading={isLoading}
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={() => deleteComment(comment._id)}
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
                        <span>Delete</span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
        </div>

        <p className="p-3">{comment.content}</p>
      </div>
    </>
  );
}
