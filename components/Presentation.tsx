import React from "react";
import styles from "../styles/Presentation.module.scss";


const Presentation = () => {
  return (
    <div className={styles.acceuilTxt}>
      <h1>Noam LE GARSMEUR</h1>
      <img
        className={styles.photoDeProfil}
        src="/image-collection-manager/backend/uploads/2e744a0a79e756af189f47a2d01b7ac5.png"
        alt="Contenue, photo de moi"
      />
      <div className={styles.text}>
        <p>
          Je suis un étudiant issu de la formation MMI à l'IUT de Lannion et alternant à la DSI de Cooperl en tant que responsable de la communication interne au sein de la direction des systémes d'information.
          Ma capacité à communiquer auprès des équipes, à chercher les informations nécéssaire et à travailler en équipe m'ont permis durant ces deux dernières années, de produire du contenue varié et divers et de développer mon sens de l'écoute, de l'ampathie.
          <br /><br />
          Durant ma formation, j'ai pu apprendre différentes notions de manière approfondie pour la plupart, notament en développement web, en audiovisuel et en communication.
          Avec le temps passé en projet, j'ai développé un attrait pour le management et la gestion de projet.
          Mon sens du travail en autonomie combiné à ma capacité à travailler en équipe me permettent de me rendre très fléxible selon les situations.
        </p>
      </div>
      <a
        className={styles.link}
        href="https://drive.google.com/file/d/1jB4BNyQF-mywceCbGjFejJC7sNXyluCb/view?usp=sharing"
      >
        Télécharger mon CV
      </a>
    </div>
  );
};

export default Presentation;
