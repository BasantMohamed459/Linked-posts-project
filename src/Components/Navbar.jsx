import React, { useContext } from "react";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(authContext);

  //   const [isLogged, setIsLogged] = useState(
  //     localStorage.getItem("token") != null
  //   );

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <HeroNavbar>
        <NavbarBrand>
          <Link
            to={"/"}
            className="font-bold text-inherit flex justify-center items-center gap-1"
          >
            <img src={logo} alt="logo" className="w-35 h-20" />
            Blog Posts
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <>
              <div className="flex items-center justify-center gap-5 ">
                <NavbarItem>
                  <Link to={"/profile"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <NavLink onClick={logout}>Log out</NavLink>
                </NavbarItem>
              </div>
            </>
          ) : (
            <>
              <NavbarItem className="lg:flex">
                <NavLink to={"/login"}>LogIn</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={"/register"}>SignUp</NavLink>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </HeroNavbar>
    </>
  );
}

export default Navbar;
