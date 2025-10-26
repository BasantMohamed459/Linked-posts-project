import axios from "axios";
export async function getAllPostsApi() {
  try {
    const { data } = await axios.get("/api/posts?limit=50", {
      headers: {
        token: localStorage.getItem("token"),
      },
      params: {
        sort: "-createdAt",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getSinglePostApi(id) {
  try {
    const { data } = await axios.get(`/api/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createPostApi(formData) {
  try {
    const { data } = await axios.post("/api/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

// upadte post
export async function updatePostApi(formData, id) {
  try {
    const { data } = await axios.put(`/api/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

// delete post

export async function deletePostApi(id) {
  try {
    const { data } = await axios.delete(`/api/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get user posts
// export async function getUserPostsApi(userId) {
//   try {
//     const { data } = await axios.get(`/api/users/${userId}/posts?limit=2`, {
//       headers: {
//         // Authorization: `Bearer ${localStorage.getItem("token")}`,
//         token: localStorage.getItem("token"),
//       },
//       // headers: {
//       //   Authorization: localStorage.getItem("token"),
//       // },
//       params: {
//         sort: "-createdAt",
//       },
//     });
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getUserPostsApi(userId) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
          sort: "-createdAt",
        },
        params: {
          limit: 50,
        },
      }
    );

    console.log("Posts response:", data);
    return data;
  } catch (error) {
    console.log("Error fetching user posts:", error.response?.data || error);
    return [];
  }
}
