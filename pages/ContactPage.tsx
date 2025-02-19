import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Ui_transitionR from "../components/Ui_transitionR";
import Footer from "../components/Footer";
import styles from "../styles/HP_PresProjects.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const ContactPage: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  useEffect(() => {
    document.title = "noamlg-Contact";
  }, []); // Le titre sera défini quand le composant est monté

  return (
    <div className={'GlobalPage'}>
      <Header BackgroundFill={"#EA5930"} />
      <main>
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
        <div  className={`${styles.Contact_container} ${styles.PresProj_Right}`} style={{ background: `#EFEFEF` }} >
            <h1>Contactez-moi dès maintenant !</h1>
            <div className={styles.text}>
              <p style={{marginBottom:'0px'}}>
                Dans le cadre de la réalisation d’une infographie sur le thème des sous-marins de l’Ifremer, nous devions choisir un engin parmi l’ensemble de leur flotte.
                <br />
                J’ai donc choisi de réaliser mon infographie sur le Nautile, le seul sous-marin habitable de l’Ifremer.<br /><br />
                J’ai opté pour une conception en 3D afin de mettre à l’épreuve mes compétences, notamment en modélisation et en rendu.<br /><br />
                Ce projet m’a également permis d’explorer des notions clés en conception d’infographie, telles que l’agencement des différents éléments.
              </p>
            </div>
        </div>
      </main>
      <Ui_transitionR className={"Right yInvert"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      {/* <Footer/> */}
    </div>
  );
};

export default ContactPage;