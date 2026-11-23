import { redirect } from "next/navigation";

// The proxy sends visitors to /app or /login; this is the fallback.
export default function Home() {
  redirect("/app");
}
