import { redirect } from "next/navigation";

export default function Dashboard() {
  return redirect("/auth/login");
}
