import React from "react";
import styles from "../styles/HP_PresProjects.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const HP_PresProjects: React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <section className={styles.HP_PresProjects_container} style={{ background: `${BackgroundFill}` }} >
      <h1>Infographie Ifremer Nautile</h1>
      <iframe className={styles.HP_mediaContent}src="https://www.youtube.com/embed/CMFnycLH24U?si=7AbiyFPG7BvSTme7" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; allowfullscreen"></iframe>
      <div className={styles.text}>
        <p>
          Un travail de modélisation et de texturing afin de réaliser une infographie sur un sous-marin de l'Ifremer. Parmis les sous-marin proposé au choix, le Nautile en faisait partie.
           <br />
          J'ai souhaité réaliser cette infographie en 3D afin de tester mes compétences en 3D et rendering. <br/>Cela m'a aussi permis de découvrir la conception d'infographie.
        </p>
      </div>
    </section>
  );
};

export default HP_PresProjects;
