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
          <h1>Infographie Ifremer Nautile</h1>
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
        <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h1>Motion animation</h1>
          <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/PB_a2CoFVcY?si=eputsSW0DSrAi18d" title="Motion animation"></iframe>
          <div className={styles.text}>
            <p>
              Dans le cadre de mon alternance chez <strong> Cooperl</strong>, au sein de la <strong>DSI</strong>, j’ai réalisé un grand nombre de vidéos enrichies de transitions spécifiques et sur mesure, ainsi que d’introductions et de conclusions personnalisées.
              <br />
              <br />
              Ce projet m’a permis d’expérimenter et de développer mes compétences dans un domaine que je maîtrisais peu ou pas du tout. L’objectif était de professionnaliser les rendus et de sortir des formats classiques que l’on retrouve quotidiennement sur les réseaux sociaux.
              <br />
              <br />
              Cette expérience m’a également appris à utiliser <strong>PlayPlay</strong> en combinaison avec <strong>DaVinci Resolve</strong>. L’association de ces outils représente un véritable atout pour la production de vidéos en série.
            </p>
          </div>
        </section>
        <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h1>Cadreur / Monteur TedX Lannion 2025</h1>
          <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/_Cj7S7ElV2U?si=l3DO2ApEyVIpWIXn" title="TedX vidéo"></iframe>
          <div className={styles.text}>
            <p>
              Le<strong> 7 février 2025</strong>, un événement <strong>TEDx</strong> s’est tenu à <strong>Lannion, au Carré Magique</strong>. J’ai eu l’opportunité de participer à la captation de cette conférence de 2h30, en immortalisant les coulisses du spectacle.
              <br />
              <br />
              En amont de l’événement, l’équipe d’organisation a commencé à préparer la captation dès <strong>novembre 2024</strong>, en recherchant des <strong>bénévoles, des partenaires et du matériel</strong>. C’est grâce à cette recherche que j’ai pu rejoindre l’équipe en tant que bénévole.
              <br />
              <br />
              Les <strong>deux jours précédant la représentation</strong>, j’ai activement pris part aux préparatifs : installation des caméras, mise en place d’un dispositif permettant de retransmettre l’événement en coulisse et assistance aux différentes équipes selon leurs besoins. Mon rôle de <strong>force de proposition et de conseil</strong> a été un véritable atout dans cette phase de préparation.
              <br />
              <br />
              Après la captation, j’ai également contribué au <strong>montage des vidéos</strong> des différents <strong>talks</strong> ainsi qu’à la réalisation de l’<strong>after movie</strong>.
            </p>
          </div>
        </section>
        <section className={`${styles.HP_PresProjects_container} ${styles.text}`} style={{ alignItems: `center` }}><p style={{ textAlign: `center` }}>Voir plus de projet selon le domaine que vous recherchez ?</p>
          <div className={`${styles.link}`}><a href="/GaleriePage">Voir la galerie</a></div>
        </section>

      </div>
    </div>
  );
};

export default HP_PresProjects;
