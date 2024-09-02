"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { ResultCode } from "@/lib/utils";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
async function getUserAccessToken(username: string, password: string) {
  return NextResponse.json({
    code: 200,
    data: {
      name: username,
    },
  });
}

export async function getUser(
  username: string,
  password: string,
  callbackUrl: string,
) {
  if (callbackUrl.endsWith("/login")) {
    if (password === "test" && username.length > 0) {
      const user = await getUserAccessToken(username, password);
      const data = await user.json();
      if (data.code === 200) {
        return data.data;
      } else return null;
    } else return null;
  }
}

interface Result {
  type: string;
  resultCode: ResultCode;
  redirectTo?: string;
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  try {
    const username = formData.get("username");
    const password = formData.get("password");
    const callbackUrl = formData.get("callbackUrl")!;

    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    return {
      type: "success",
      resultCode: ResultCode.UserLoggedIn,
      redirectTo: callbackUrl.toString(),
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            type: "error",
            resultCode: ResultCode.InvalidCredentials,
          };
        default:
          return {
            type: "error",
            resultCode: ResultCode.UnknownError,
          };
      }
    }
  }
}
