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
      }, 5000);
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
        Étudiant en formation MMI à l'IUT de Lannion et alternant à la DSI chez Cooperl en tant que responsable de la communication interne.
        </p><hr/>
        <p>Étant admis à l'ENSAM dans le master MTI3D à Laval et Chalon-sur-Saône, je suis aujourd'hui à la recherche d'une alternance pour la rentrée 2025 dans le domaine de la 3D et des technologies interactives en XR</p>
        <p>Depuis mon arrivé dans le milieu universitaire, j'ai tout de suite aimé prendre part à divers projets, tant sur le plan professionnel, qu'associatif ou encore personnel.</p>
        <p>J'aime travailler en collaboration et en autonomie, sur des projets divers avec de forts enjeux possibles.
        </p>
          <p>Découvrez via ce portfolio fait main, ma créativité, mon enthousiasme et ma passion.</p>
      </div>
      <div className={styles.link}>
        <a style={{padding:"10px"}} href="/ContactPage">
          Télécharger mon CV
        </a>
      </div>
    </section>
  );
};

export default HP_Top;
