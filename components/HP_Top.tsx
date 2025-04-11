import React, { useState, useEffect } from "react";
import styles from "../styles/HP_Presentation.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const mots1 = ["créatif", "organisé", "rigoureux"];

const HP_Top: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  const [index1, setIndex1] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Lancer l'animation de fade out
      setFade(true);

      // Après 500ms (temps de transition), changer le mot et fade in
      setTimeout(() => {
        setIndex1((i) => (i + 1) % mots1.length);
        setFade(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.HP_Pres_container}
      style={{ background: `${BackgroundFill}`, padding: "20px" }}
    >
      <h1>Noam LE GARSMEUR</h1>
      <img
        className={styles.photoDeProfil}
        src="/src/ui/Noam_Image.png"
        alt="Contenu, photo de moi"
      />
      <div className={styles.text}>
        <p>
          Je suis{" "}
          <span
            className={`${styles.changingWord} ${fade ? styles.fadeOut : ""}`}
          >
            {mots1[index1]}
          </span>
        </p>
        <p>
          Je suis étudiant en formation MMI à l'IUT de Lannion et alternant à la DSI de Cooperl en tant que responsable de la communication interne au sein de la Direction des Systèmes d'Information.
        </p>
      </div>
      <div className={styles.link}>
        <a href="https://drive.google.com/file/d/1Ae4sLgKBmPtNJ3iuPzbwPkCzTE0JMFn8/view?usp=drive_link">
          Télécharger mon CV
        </a>
      </div>
    </section>
  );
};

export default HP_Top;
