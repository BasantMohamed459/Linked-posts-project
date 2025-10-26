import axios from "axios";
// import { ca } from "zod/locales";

export async function sendRegisterData(userData) {
  try {
    const response = await axios.post("/api/users/signup", userData);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
}
export async function sendLoginData(userData) {
  try {
    const response = await axios.post("/api/users/signin", userData);
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
    const response = await axios.get("/api/users/profile-data", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
}
