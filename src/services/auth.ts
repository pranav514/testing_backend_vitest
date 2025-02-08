import { sign } from "jsonwebtoken";
import { User, UserAuth, UserUpdate } from "../interface/authInterface";
import { create, findUnique, Update } from "../repositories/auth";

export const CreateUser = async ({
  name,
  gender,
  email,
  password,
  phone_number,
}: User) => {
  console.log("name", name);
  console.log("email", email);
  console.log("password", password);
  console.log("phone_number", phone_number);
  if (!name || !email || !password) {
    return {
      message: "enter the necessary fields which are name, email and password",
      status: 411,
    };
  }
  try {
    const user = await create({
      name,
      gender,
      email,
      password,
      phone_number,
    });

    return {
      message: "user created successfully",
      status: 200,
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "An error occured while creating the user",
      status: 500,
    };
  }
};

export const SignIn = async ({ email, password }: UserAuth) => {
  const user = await findUnique(email);
  console.log(user);
  if (!user) {
    return {
      message: "no user exist cannot login",
      status: 402,
    };
  }

  if (user.password != password) {
    return {
      message: "incorrect password",
      status: 411,
    };
  }
  const token = sign(user.id, "secret");
  return {
    message: "user logged in sucessfully",
    status: 200,
    data: token,
  };
};

export const UpdateUser = async ({
  name,
  password,
  phone_number,
  userId,
}: UserUpdate) => {
  try {
    // console.log(userId);

    if (!userId) {
      return {
        message: "userId is not present",
        status: 402,
      };
    }

    const user = await Update({ name, password, phone_number, userId });
    return {
      message: "user updated Sucessfully",
      status: 200,
      user,
    };
  } catch (error) {
    return {
      message: "error while updating the user",
      status: 411,
    };
  }
};
