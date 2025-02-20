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
              J’ai donc choisi de réaliser mon infographie sur le Nautile, le seul sous-marin habitable de l’Ifremer.<br /><br />
              J’ai opté pour une conception en 3D afin de mettre à l’épreuve mes compétences, notamment en modélisation et en rendu.<br /><br />
              Ce projet m’a également permis d’explorer des notions clés en conception d’infographie, telles que l’agencement des différents éléments.
            </p>
          </div>
        </section>
        <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h1>Motion animation</h1>
          <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/PB_a2CoFVcY?si=eputsSW0DSrAi18d" title="Motion animation"></iframe>
          <div className={styles.text}>
            <p>
              Dans le cadre de mon alternance chez Cooperl, au sein de la DSI, j’ai réalisé un grand nombre de vidéos agrémentées de transitions spécifiques et sur mesure, ainsi que d’introductions et d’endings.<br /><br />

              J’ai expérimenté et développé mes compétences dans ce domaine, que je connaissais peu ou pas du tout. L’objectif était de professionnaliser les rendus et de sortir des formats classiques que l’on voit quotidiennement sur les réseaux sociaux.<br /><br />

              Cela m'a également appris à maîtriser l’outil PlayPlay en combinaison avec DaVinci Resolve. Cette association d’outils constitue un véritable atout pour la production de vidéos en série.
            </p>
          </div>
        </section>
        <section className={`${styles.HP_PresProjects_container} ${styles.PresProj_Right}`} style={{ background: `${BackgroundFill}` }} >
          <h1>Cadreur / Monteur TedX Lannion 2025</h1>
          <iframe className={styles.HP_mediaContent} src="https://www.youtube.com/embed/_Cj7S7ElV2U?si=l3DO2ApEyVIpWIXn" title="TedX vidéo"></iframe>
          <div className={styles.text}>
            <p>
              Le 7 février 2025 se tenait un événement TedX à Lannion, au Carré Magique. Cela a été une captation de 2h30 durant laquelle j'ai pu capturer les coulisses du spectacle.<br />
              J'ai néanmoins pris part aux deux jours de préparation précédant la représentation. Nous avons préparé les différentes caméras et mis en place un dispositif complet afin de transmettre également l'événement en coulisse et aidé les différentes équipes selon les besoins.<br />
              Être force de proposition et de conseils a été un grand plus dans la préparation de cet événement.<br /><br />

              En amont du spectacle, nous avons commencé à préparer cette captation dès novembre 2024, en recherchant des bénévoles, des partenaires et du matériel.<br /><br />

              En aval de la captation, j'ai également participé aux montages vidéo des différents talks et de l'after movie.

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
