import Image from "next/image";
import Link from "next/link";
import styles from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="TravelTrucks"
            width={136}
            height={16}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Home
          </Link>

          <Link href="/catalog" className={styles.link}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
