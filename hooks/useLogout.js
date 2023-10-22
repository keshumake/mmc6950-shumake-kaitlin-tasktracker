import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  return async function handleLogout() {
    try {
      const res = await fetch(
        `${
          process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
        }/api/logout`,
        { method: "POST" }
      );
      if (res.status === 200) router.reload("/");
      router.reload("/");
    } catch (err) {
      router.reload("/");
      console.log(err);
    }
  };
}
