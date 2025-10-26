import * as zod from "zod";

export const schema = zod.object({
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
});
