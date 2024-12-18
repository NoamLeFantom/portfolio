import { useState } from "react";
import styles from "../styles/Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <h1>
          <a href="#" className={styles.logo}><img
            src={`src/ui/Fantom.png`}
            alt={'Logo du site'}
            className={styles.detailImage}
          /></a>
        </h1>
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {/* Icône menu ou croix selon l'état */}
          {isOpen ? (
            <svg width="25" height="27" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.25" y1="-1.25" x2="32.8092" y2="-1.25"
                transform="matrix(0.679134 -0.734015 0.679134 0.734015 1.86914 27)"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="1.25" y1="-1.25" x2="32.8092" y2="-1.25"
                transform="matrix(0.679134 0.734015 -0.679134 0.734015 0 2)"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="31" height="23" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30.0312 11.5C30.0312 10.7233 29.4016 10.0938 28.625 10.0938H2.375C1.59835 10.0938 0.96875 10.7233 0.96875 11.5C0.96875 12.2767 1.59835 12.9062 2.375 12.9062H28.625C29.4016 12.9062 30.0312 12.2767 30.0312 11.5Z"
                fill="white"
              />
              <path
                d="M30.0312 2.125C30.0312 1.34835 29.4016 0.71875 28.625 0.71875H2.375C1.59835 0.71875 0.96875 1.34835 0.96875 2.125C0.96875 2.90165 1.59835 3.53125 2.375 3.53125H28.625C29.4016 3.53125 30.0312 2.90165 30.0312 2.125Z"
                fill="white"
              />
              <path
                d="M30.0312 20.875C30.0312 20.0983 29.4016 19.4688 28.625 19.4688H2.375C1.59835 19.4688 0.96875 20.0983 0.96875 20.875C0.96875 21.6517 1.59835 22.2812 2.375 22.2812H28.625C29.4016 22.2812 30.0312 21.6517 30.0312 20.875Z"
                fill="white"
              />
            </svg>
          )}
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
          <li><a className={styles.link} href="index.html">Accueil</a></li>
          <li><a className={styles.link} href="MesProjets.html">Projets</a></li>
          <li><a className={styles.link} href="freebiz.html">Freebiz</a></li>
          <li><a className={styles.link} href="#IDquiSuisJe">Qui suis-je</a></li>
          <li><a className={styles.link} href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
