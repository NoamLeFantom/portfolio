import React from "react";
import styles from "../styles/Presentation.module.scss";

import Ui_transitionR from "../components/Ui_transitionR";

type ColorBackground = {
  BackgroundFill?: string;
};

const Presentation: React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <div className={styles.acceuilTxt} style={{ background: `${BackgroundFill}` }} >
      <h1>Noam LE GARSMEUR </h1>
      < img
        className={styles.photoDeProfil}
        src="src/uploads/2e744a0a79e756af189f47a2d01b7ac5.png"
        alt="Contenue, photo de moi"
      />
      <div className={styles.text}>
        <p>
          Je suis un étudiant issu de la formation MMI à l'IUT de Lannion et alternant à la DSI de Cooperl en tant que responsable de la communication interne au sein de la direction des systèmes d'information.
          Ma capacité à communiquer auprès des équipes, à chercher les informations nécessaires et à travailler en équipe m'ont permis durant ces deux dernières années, de produire du contenu varié et divers et de développer mon sens de l'écoute et de l'empathie.
          < br /> <br />
          Durant ma formation, j'ai pu apprendre différentes notions de manière approfondie pour la plupart, notamment en développement web, en audiovisuel et en communication.
          Avec le temps passé en projet, j'ai développé un attrait pour le management et la gestion de projet.
          Mon sens du travail en autonomie combiné à ma capacité à travailler en équipe me permettent de me rendre très flexible selon les situations.
        </p>
      </div>
    </div>
  );
};

export default Presentation;
