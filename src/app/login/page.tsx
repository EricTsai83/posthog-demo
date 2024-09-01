import LoginForm from "@/components/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center p-8 h-full flex-grow">
      <LoginForm />
    </div>
  );
}
