import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendLoginData } from "../Services/authServices";
import { NavLink, useNavigate } from "react-router-dom";
import { schema } from "../Schema/loginSchema";
import { authContext } from "../Context/AuthContext";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(authContext);
  async function signIn(userData) {
    setIsLoading(true);
    try {
      const responseData = await sendLoginData(userData);

      if (responseData.status === 200) {
        localStorage.setItem("token", responseData.data.token);
        setIsLoggedIn(responseData.data.token);
        navigate("/");
        setApiError(null);
        console.log("successfully login", responseData.data);
      } else {
        setApiError(responseData.error || "incorrect email or password");
      }
    } catch (error) {
      // لو حصل Exception من Axios (زي النت واقع أو status >= 400)
      setApiError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message
      );
    }
    setIsLoading(false);
  }

  // console.log("errors", errors);

  return (
    <>
      <div className="bg-white text-center rounded-2xl p-6 shadow-2xl min-w-md">
        <h2 className="text-4xl text-center text-cyan-950 mb-4">Login</h2>
        <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-3.5">
          <Input
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
            variant="bordered"
            label="Email"
            {...register("email")}
            type="email"
          />
          <Input
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password)}
            variant="bordered"
            label="Password"
            {...register("password")}
            type="password"
          />

          <Button
            isLoading={isLoading}
            color="primary"
            variant="faded"
            type="submit"
          >
            Login
          </Button>
          <div>
            If you have no account{" "}
            <NavLink
              to={"/register"}
              className="text-blue-600 text-shadow-black"
            >
              {" "}
              SignUP now
            </NavLink>
          </div>
          {apiError && <span className="text-red-500">{apiError}</span>}
        </form>
      </div>
    </>
  );
}

export default Login;
