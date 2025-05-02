import React, { useEffect } from "react";
import Header from "../components/Header";
import Ui_transitionR from "../components/Ui_transitionR";
import Footer from "../components/Footer";
import styles from "../styles/Contact_Page.module.scss";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <div className={`${styles.Contact_container} ${styles.PresProj_Right}`} style={{ background: `#EFEFEF` }}>
          <h1>Contactez-moi dès maintenant !</h1>
          <h2>Je suis toujours à la recherche de nouveaux défis !</h2>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/noam-le-garsmeur-4b5003242" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/noam_lg">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Email" />
              <span>Instagram</span>
            </a>
          </div>
          <div className={styles.text} style={{ display: `flex`, flexDirection: `column` }}>
            <p style={{ marginBottom: '0px' }}>
              Veuillez trouver mes informations de contact dans mon cv.
              <br />
            </p>
          </div>
          <iframe className={'pdfViewer'} src="/src/noamlg_Website-ressources/NoamCV-04-2025.pdf"> </iframe>
        </div>
      </main>
      <Ui_transitionR className={"Right yInvert"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      {/* <Footer/> */}
      <Analytics /><SpeedInsights />
    </div>
  );
};

export default ContactPage;
