import axios from "axios";
// import { ca } from "zod/locales";

export async function sendRegisterData(userData) {
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      userData
    );
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
}
export async function sendLoginData(userData) {
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      userData
    );
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
}

// get logged in user data
export async function getLoggedUserDataApi() {
  try {
    const response = await axios.get(
      "https://linked-posts.routemisr.com/users/profile-data",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
}

// change profile image
export async function uploadProfilePhotoApi(formData) {
  try {
    const response = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      }
    );

    return response;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
}

// change password

export async function changePasswordApi(data) {
  try {
    const response = await axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}
