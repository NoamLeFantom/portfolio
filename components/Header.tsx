import { useState, useEffect, useCallback } from "react";
import classNames from "classnames"; // Import de classnames pour une gestion propre des classes CSS
import styles from "../styles/Header.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const Header: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollState, setScrollState] = useState({ isVisible: true, lastY: 0 });

  // Toggle menu mobile
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollState((prev) => {
        const currentY = window.scrollY;
        return {
          isVisible: currentY < prev.lastY || currentY < 50,
          lastY: currentY,
        };
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={classNames(styles.header, {
        [styles.visible]: scrollState.isVisible,
        [styles.hidden]: !scrollState.isVisible,
      })}
      style={{ background: BackgroundFill }}
    >
      <nav className={styles.container}>
        <a href="/">
          <img src="/src/ui/logo.png" alt="Logo du site" className={styles.logo} />
        </a>
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
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
              <path d="M30 11.5H2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M30 2H2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M30 20.875H2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <nav className={classNames(styles.menu, { [styles.menuOpen]: isOpen })} style={{ background: BackgroundFill }}>
          <li className={styles.link}><a href="/">Accueil</a></li>
          <li className={styles.link}><a href="/GaleriePage">Galerie</a></li>
          <li className={styles.link}><a href="/ContactPage">Contact</a></li>
          <li className={styles.link}><a href="SkillsPage">Cartographie de Compétences</a></li>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
