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

const CablesGL: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  useEffect(() => {
    document.title = "noamlg-Cables.gl";
  }, []); // Le titre sera défini quand le composant est monté

  return (
    <div className={'GlobalPage'}>
      <Header BackgroundFill={"#EA5930"} />
      <main>
        <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
        <div className={`${styles.Contact_container} ${styles.PresProj_Right}`} style={{ background: `#EFEFEF` }} >
          <h1>Mes expérimentations sur Cables.gl</h1>
          <div className={styles.text} style={{ display: `flex`, flexDirection: `column` }}>
            <p style={{ marginBottom: '0px' }}>
              Durant mon BUT MMI j'ai découvert le formidable outils 
              <br />
            </p>
          </div>
          <iframe style={{ width: '100%', height: '100%', border: '0px' }} allow="autoplay" src="https://cables.gl/view/tvDm1H"></iframe>
          </div>
      </main>
      <Ui_transitionR className={"Right yInvert"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      {/* <Footer/> */}
      <Analytics /><SpeedInsights />
    </div>
  );
};

export default CablesGL;
