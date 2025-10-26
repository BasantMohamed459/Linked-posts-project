import { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../Services/authServices";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  const [userData, setUserData] = useState(null);

  async function getLoggedUserData() {
    const response = await getLoggedUserDataApi();
    if (response.data.message) {
      setUserData(response.data.user);
      // setUserData({
      //   ...response.data.user,
      //   token: localStorage.getItem("token"),
      // });
      console.log("response in auth context", response);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getLoggedUserData();
    }
  }, [isLoggedIn]);

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </authContext.Provider>
  );
}
