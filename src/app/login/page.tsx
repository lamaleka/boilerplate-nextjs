import { redirect } from "next/navigation";

export default function LoginPage() {
  return redirect("/auth/login");
}
