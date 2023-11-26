import Link from "next/link";
import { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { slide as Menu } from "react-burger-menu";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.username = user.username;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);
export default function Login(props) {
  const router = useRouter();
  const [{ username, password }, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ username, password, ...{ [e.target.name]: e.target.value } });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${
          process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
        }/api/login`,
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
        <p>
          <Link className="menu-item" href="/signup">
            Sign Up
          </Link>
        </p>
      </Menu>
      <Header isLoggedIn={props.isLoggedIn} username={props.username} />
      <title>Task Tracker</title>
      <main className={styles.main}>
        <h1 className={styles.title}>Please login to use Task Tracker!</h1>

        <form
          className={[styles.card, styles.form].join(" ")}
          onSubmit={handleLogin}
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
          <button>Login</button>
          {error && <p>{error}</p>}
        </form>
        <Link href="/signup">
          <button className={styles.signup}>Sign up instead?</button>
        </Link>
      </main>
      <Footer></Footer>
    </div>
  );
}