import axios from "axios";

export async function createCommentApi(content, postId) {
  try {
    const { data } = await axios.post(
      "/api/comments",
      {
        content,
        post: postId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

// update comment
export async function updateCommentApi(id, commentContent) {
  try {
    const { data } = await axios.put(
      `/api/comments/${id}`,
      {
        content: commentContent,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

// delete comment

export async function deleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(`/api/comments/${commentId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get post comments
export async function getPostCommentsApi(postId) {
  try {
    const { data } = await axios.get(`/api/posts/${postId}/comments`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
