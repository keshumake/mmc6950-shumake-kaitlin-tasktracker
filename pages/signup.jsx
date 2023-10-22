import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/signup.module.css";
import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
const IMAGE_URL = "/bwpug.jpg";
import { slide as Menu } from "react-burger-menu";

export default function Signup(props) {
  const router = useRouter();
  const [{ username, password, "confirm-password": confirmPassword }, setForm] =
    useState({
      username: "",
      password: "",
      "confirm-password": "",
    });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      username,
      password,
      "confirm-password": confirmPassword,
      ...{ [e.target.name]: e.target.value.trim() },
    });
  }
  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!username) return setError("Must include username");
    if (password !== confirmPassword) return setError("Passwords must Match");

    try {
      const res = await fetch(
        `${
          process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
        }/api/signup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (res.status === 200) return router.push("/");
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <Menu right>
        <p>
          <Link className="menu-item" href="/">
            Home
          </Link>
        </p>
        <p>
          <Link className="menu-item" href="/login">
            Login
          </Link>
        </p>
      </Menu>
      <Header></Header>

      <main className={styles.main}>
        <div className={styles.image}>
          <Image
            src={IMAGE_URL}
            width={500}
            height={650}
            objectfit="cover"
            objectposition="center"
          ></Image>
        </div>
        <div className={styles.maincontent}>
          <h1 className={styles.title}>
            Welcome to the Task Tracker Signup Page!
          </h1>

          <p className={styles.description}>
            Status:{" "}
            <code className={styles.code}>
              {!props.isLoggedIn && " Not"} Logged In
            </code>
          </p>

          <form
            className={[styles.card, styles.form].join(" ")}
            onSubmit={handleCreateAccount}
          >
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={username}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={password}
            />
            <label htmlFor="confirm-password">Confirm Password: </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              onChange={handleChange}
              value={confirmPassword}
            />
            <button>Submit</button>
            {error && <p>{error}</p>}
          </form>
          <Link href="/login">
            <p className={styles.login}>Login instead?</p>
          </Link>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}
