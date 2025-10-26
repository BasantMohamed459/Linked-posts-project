import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendRegisterData } from "../Services/authServices";
import { NavLink, useNavigate } from "react-router-dom";
import { schema } from "../Schema/registerSchema";

function Register() {
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

  // async function signUp(userData) {
  //   setIsLoading(true);
  //   const responseData = await sendRegisterData(userData);
  //   if (responseData.error) {
  //     setApiError(null);
  //   } else {
  //     setApiError(responseData.data.message);
  //   }
  //   setIsLoading(false);
  //   console.log("responseData", responseData);
  // }

  const navigate = useNavigate();
  async function signUp(userData) {
    setIsLoading(true);
    try {
      const responseData = await sendRegisterData(userData);

      if (responseData.status === 200) {
        navigate("/login");
        setApiError(null);
        console.log("successfully login", responseData.data);
      } else {
        setApiError(responseData.error || "user already exists");
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
        <h2 className="text-4xl text-center text-cyan-950 mb-4">Register</h2>
        <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-3.5">
          <Input
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name)}
            variant="bordered"
            label="Name"
            {...register("name")}
            type="text"
          />
          {/* {errors.name && <p>{errors.name?.message}</p>} */}

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
          <Input
            errorMessage={errors.rePassword?.message}
            isInvalid={Boolean(errors.rePassword)}
            variant="bordered"
            label="RePassword"
            {...register("rePassword")}
            type="password"
          />
          <div className="flex gap-3.5">
            <Input
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(errors.dateOfBirth)}
              variant="bordered"
              label="DateOfBirth"
              {...register("dateOfBirth")}
              type="date"
            />

            <Select
              errorMessage={errors.gender?.message}
              isInvalid={Boolean(errors.gender)}
              className=""
              label="Select a gender"
              {...register("gender")}
              variant="bordered"
            >
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>
            </Select>
          </div>
          <Button
            isLoading={isLoading}
            color="primary"
            variant="faded"
            type="submit"
          >
            Register
          </Button>
          <div>
            If you have account{" "}
            <NavLink to={"/login"} className="text-blue-600 text-shadow-black">
              {" "}
              SignIn now
            </NavLink>
          </div>
          {apiError && <span className="text-red-500">{apiError}</span>}
        </form>
      </div>
    </>
  );
}

export default Register;
