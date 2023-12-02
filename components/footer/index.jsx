import styles from "./style.module.css";
import Image from "next/image";
import facebookLogo from "../facebook.png";
import instagramLogo from "../instagram.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialmedia}>
        <p>Find us on social media!</p>
        <Image src={facebookLogo} width={35} height={35} alt="Facebook Logo"></Image>
        <Image src={instagramLogo} height={35} width={35} alt="Instagram Logo"></Image>
      </div>

      <p>by Kaitlin Shumake, 2023</p>
    </footer>
  );
}
