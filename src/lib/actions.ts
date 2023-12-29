"use server";
import { signIn } from "next-auth/react";

type data = {
  email: string;
  password: string;
};

export async function authenticate(
  prevState: string | undefined,
  formData: data
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
