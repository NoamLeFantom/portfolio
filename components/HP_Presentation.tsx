import React from "react";
import styles from "../styles/HP_Presentation.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const HP_Presentation: React.FC<ColorBackground> = ({ BackgroundFill }) => {

  return (
    <section className={styles.HP_Pres_container} style={{ background: `${BackgroundFill}`, padding:"20px"}} >
      <h1>Noam LE GARSMEUR </h1>
      < img
        className={styles.photoDeProfil}
        src="/src/ui/Noam_Image.png"
        alt="Contenue, photo de moi"
      />
      <div className={styles.text}>
        <p>
          Je suis un étudiant issu de la formation <strong>MMI à l'IUT de Lannion</strong> et alternant à la <strong>DSI de chez Cooperl</strong> en tant que responsable de la <strong>communication interne</strong> au sein de la Direction des Systèmes d'Information.<br/>
          Ma capacité à communiquer auprès des équipes, à chercher les informations nécessaires et à travailler en équipe m'ont permis durant ces deux dernières années, de produire du contenu varié et divers et de développer mon sens de l'écoute et de l'empathie.
          < br /> <br />
          Durant ma formation, j'ai pu apprendre différentes notions de manière approfondie pour la plupart, notamment en développement web, en audiovisuel et en communication.<br/>
          Avec le temps passé en projet, j'ai développé un attrait pour le management et la gestion de projet.<br/>
          Mon sens du travail en autonomie combiné à ma capacité à travailler en équipe me permettent de me rendre très flexible selon les situations.
        </p>
      </div>
    </section>
  );
};

export default HP_Presentation;
