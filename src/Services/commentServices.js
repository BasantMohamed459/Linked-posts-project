import axios from "axios";

export async function createCommentApi(content, postId) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
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
      `https://linked-posts.routemisr.com/comments/${id}`,
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
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
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

// get post comments
export async function getPostCommentsApi(postId) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${postId}/comments`,
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
