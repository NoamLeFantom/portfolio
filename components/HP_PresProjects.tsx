import React from "react";
import styles from "../styles/HP_PresProjects.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const HP_PresProjects: React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <div style={{ background: `${BackgroundFill}` }}>
      <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
        <h1>Infographie Ifremer Nautile</h1>
        <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/CMFnycLH24U?si=7AbiyFPG7BvSTme7" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; allowfullscreen"></iframe>
        <div className={styles.text}>
          <p>
            Dans le cadre de la réalisation d’une infographie sur le thème des sous-marins de l’Ifremer, nous devions choisir un engin parmi l’ensemble de leur flotte.
            <br />
            J’ai donc choisi de réaliser mon infographie sur le Nautile, le seul sous-marin habitable de l’Ifremer.<br />
            J’ai opté pour une conception en 3D afin de mettre à l’épreuve mes compétences, notamment en modélisation et en rendu.<br />
            Ce projet m’a également permis d’explorer des notions clés en conception d’infographie, telles que l’agencement des différents éléments.
          </p>
        </div>
      </section>
      <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Left}`} style={{ background: `${BackgroundFill}` }} >
        <h1>Motion animation</h1>
        <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/CMFnycLH24U?si=7AbiyFPG7BvSTme7" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; allowfullscreen"></iframe>
        <div className={styles.text}>
          <p>
          Dans le cadre de mon alternance chez Cooperl, au sein de la DSI, j’ai réalisé un grand nombre de vidéos agrémentées de transitions spécifiques et sur mesure, ainsi que d’introductions et d’endings.<br/>

J’ai expérimenté et développé mes compétences dans ce domaine, que je connaissais peu ou pas du tout. L’objectif était de professionnaliser les rendus et de sortir des formats classiques que l’on voit quotidiennement sur les réseaux sociaux.<br/>

J’ai également appris à maîtriser l’outil PlayPlay en combinaison avec DaVinci Resolve. Cette association d’outils constitue un véritable atout pour la production de vidéos en série.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HP_PresProjects;
