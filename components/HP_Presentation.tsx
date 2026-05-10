import React from "react";
import styles from "../styles/HP_Presentation.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const HP_Presentation: React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <section className={styles.HP_Pres_container} style={{ background: `${BackgroundFill}`, padding: "20px" }} >
      <h1>Noam LE GARSMEUR </h1>
      < img
        className={styles.photoDeProfil}
        src="/src/ui/Noam_Image.png"
        alt="Contenue, photo de moi"
      />
      <div className={styles.text}>
        <p>
        Étudiant en formation MMI à l'IUT de Lannion et alternant à la DSI chez Cooperl en tant que responsable de la communication interne.          < br />
          < br />
          Grâce à ma capacité à communiquer efficacement, à rechercher les informations pertinentes et à collaborer avec différentes équipes, j'ai pu, au cours des deux dernières années, produire un contenu varié et développer mon sens de l'écoute ainsi que mon empathie.
          <br />
          < br />
          Ma formation m'a permis d'acquérir des compétences approfondies en développement web, en audiovisuel et en communication. Par ailleurs, mon engagement dans divers projets m'a amené à développer un fort intérêt pour le management et la gestion de projet.
          <br />
          < br />
          Autonome tout en étant à l'aise dans le travail en équipe, je sais m'adapter aux différentes situations avec flexibilité et efficacité.
          < br />
          < br />< br />
          Je m'investis également dans divers milieux associatifs à plusieurs niveaux.

          Je fais partie de la direction de l'association de voile LVEL à Lannion. À ce titre, j'interviens principalement dans les relations entre l'association et l'IUT, notamment en endossant le rôle de porteur de projet pour les différents concours organisés dans le cadre de la Régate des IUT.

          < br />
          < br />Mon rôle consiste à guider et à assister les étudiants dans la réalisation des livrables nécessaire au concours. Je coordonne aussi la participation au challenge voile de cette régate.
        </p>
        <p>Admis à l'ENSAM dans le master MTI3D de Laval et Chalon-sur-Saône, je suis aujourd'hui à la recherche d'une alternance pour la rentrée 2025 dans le domaine de la 3D et des technologies interactives en XR</p>
        <p>Mon objectif à travers ce master et cette alternance est de monter en compétences de manière professionnelle sur le domaine de la XR.</p>
      </div>
      <div className={`${styles.link}`}>
        <a
          href="https://drive.google.com/file/d/1Ae4sLgKBmPtNJ3iuPzbwPkCzTE0JMFn8/view?usp=drive_link" >
          Télécharger mon CV
        </a></div>
    </section>
  );
};

export default HP_Presentation;
