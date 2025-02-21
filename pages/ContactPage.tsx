import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Ui_transitionR from "../components/Ui_transitionR";
import Footer from "../components/Footer";
import styles from "../styles/Contact_Page.module.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <div className={`${styles.Contact_container} ${styles.PresProj_Right}`} style={{ background: `#EFEFEF` }} >
          <h1>Contactez-moi dès maintenant !</h1>
          <div className={styles.text} style={{ display: `flex`, flexDirection: `column` }}>
            <p style={{ marginBottom: '0px' }}>
              Veuillez trouvez mes information de contact dans mon cv.
              <br />
            </p>
            <div className={`${styles.link}`}>
              <a
                href="https://drive.google.com/file/d/1Ae4sLgKBmPtNJ3iuPzbwPkCzTE0JMFn8/view?usp=drive_link" >
                Voir mon CV
              </a></div>
          </div>
        </div>
      </main>
      <Ui_transitionR className={"Right yInvert"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      {/* <Footer/> */}
      <Analytics /><SpeedInsights />
    </div>
  );
};

export default ContactPage;
