import { useState, useEffect } from "react";
import styles from "../styles/Header.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};


const Footer : React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <footer className={`${styles.header}` } style={{ background: `${BackgroundFill}` }}>

      <nav className={styles.container}>
        <a href="/"><img
          src={`src/ui/Fantom.png`}
          alt={'Logo du site'}
          className={styles.logo}
        /></a>
          {/* Icône menu ou croix selon l'état */}
          </nav>
    </footer>
  );
};

export default Footer;
