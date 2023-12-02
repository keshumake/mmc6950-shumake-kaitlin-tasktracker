// burger menu : https://www.npmjs.com/package/react-burger-menu

import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import Image from "next/image";
import logoWithText from "../logowtext.png";
const IMAGE_URL = "/footprints.png";

export default function Header(props) {
  const logout = useLogout();

  return (
    <header className={styles.container}>
      <div className={styles.headertitle}>
        <Link href="/">
          <Image className={styles.headerimage} src={logoWithText} width={175} height={132} alt="Task Tracker Logo"></Image>
        </Link>
      </div>
      {props.isLoggedIn ? (
        <>
          <div className={styles.loggedin}>
            <p>Welcome, {props.username}!</p>
            <p onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}
