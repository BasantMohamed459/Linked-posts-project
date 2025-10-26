import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

export default function AuthProtectedRoute({ children }) {
  //   const [isLogged, setIsLogged] = useState(
  //     localStorage.getItem("token") != null
  //   );
  const { isLoggedIn } = useContext(authContext);

  return !isLoggedIn ? children : <Navigate to={"/"} />;
}
