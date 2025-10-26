import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(4, "Name must be at least 4 characters")
      .max(25, "Name must be at most 25 characters")
      .regex(
        /^[A-Z][a-z]+$/,
        "Name must contain only letters start with capital"
      ),
    email: zod
      .string()
      .nonempty("Invalid email address")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid password"
      ),
    rePassword: zod
      .string()
      .nonempty("Re-entering password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid password"
      ),
    dateOfBirth: zod.coerce
      .date("Date of Birth is required")
      .refine((dateValue) => {
        const enteredDate = dateValue.getFullYear();
        const currentDate = new Date().getFullYear();
        const differenceAge = currentDate - enteredDate;
        return differenceAge >= 18;
      }, "You must be at least 18 years old"),
    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });
