import React from "react";
import styles from "../styles/HP_PresProjects.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const HP_PresProjects: React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <div className={''}>
      <div style={{ background: `${BackgroundFill}` }}>
        <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h2>Journée du crime et de la science, dispositif interactif</h2>
          <iframe className={styles.HP_mediaContent} width="560" height="315" src="https://www.youtube.com/embed/QBAhmnab_c0?si=8akSpXDlIxgXfadc&amp;start=32" title="Journée crime et science France 3 Bretagne" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className={styles.text}>
            <p>
              Les 23, 24 et 25 mai, se déroulait les journées du crime et de la science à Ploeumeur-Bodou.
              Dans ce cadre, nous avons développé un dispositif interactif en Réalité Augmentée destinée aux jeunes publiques et amateur de technologies interactive.<br/>
              Pas moins de 230 personnes ont testé ce dispositif par groupe de 2 à 3 personnes, avec une majorité d'enfants et parents.
              Durant l'événement, je guidai les usagers en leur expliquant les règles du jeu et le fonctionnement des dispositifs.
            </p>
          </div>
        </section>
        <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h2>Laval Virtual hackathon</h2>
          <iframe className={styles.HP_mediaContent} src="src/uploads/VRLavalVirtual.mp4" title="Laval Virtual hackathon project" auto-play="false"></iframe>
          <div className={styles.text}>
            <p>
              L'IUT de Lannion a participé à la compétition interécole du hackathon organisé lors du Laval Virtual.
              Cette compétition s'inscrit dans l'un des plus gros évenement dans le domaine des XR en Europe.<br/>
              L'objectif lors de ce hackathon de 32h était de réaliser un jeu en XR sur une thématique défini : "Prove me wrong - The Humankinds lives in simulation".
            </p>
          </div>
        </section>
       <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h2>Infographie Ifremer Nautile</h2>
          <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/FYzzeZrmXmg?si=tlmNh9HCPrI2UWXL" title="Nautile presentation"></iframe>
          <div className={styles.text}>
            <p>
              Dans le cadre de la réalisation d’une infographie sur le thème des sous-marins de l’Ifremer, nous devions choisir un engin parmi l’ensemble de leur flotte.
              <br />
              J’ai décidé de consacrer mon infographie au <strong>Nautile</strong>, le seul sous-marin habitable de l’Ifremer.
              <br />
              <br />
              Pour ce projet, j’ai opté pour une <strong>conception en 3D</strong> afin de mettre à l’épreuve mes compétences, notamment en modélisation et en rendu.
              <br />
              <br />
              Cette expérience m’a également permis d’approfondir des notions essentielles en conception d’infographie, notamment l’agencement des différents éléments.
            </p>
          </div>
        </section>
        <section className={`${styles.HP_PresProjects_container} ${styles.text}`} style={{ alignItems: `center` }}><p style={{ textAlign: `center` }}>Voir plus de projet selon le domaine que vous recherchez ?</p>
          <div style={{padding:"10px"}}  className={`${styles.link}`}><a href="/GaleriePage">Voir la galerie</a></div>
        </section>

      </div>
    </div>
  );
};

export default HP_PresProjects;
