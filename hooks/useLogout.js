import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  return async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.status === 200) router.reload("/");
      router.reload("/");
    } catch (err) {
      router.reload("/");
      console.log(err);
    }
  };
}
