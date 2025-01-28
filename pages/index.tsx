import React from "react";
import Timeline from "../components/Timeline";
import Gallery from "../components/Gallery";
import timelineData from "../public/src/data/timeline.json";
import Header from "../components/Header";
import Presentation from "../components/Presentation";
import Ui_transitionR from "../components/Ui_transitionR";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Noam_lg";
  }, []); // Le titre sera défini quand le composant est monté
  return (
    <div className={'GlobalPage'}>
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      <Header BackgroundFill={"#EA5930"} />
      <Presentation BackgroundFill={"#EFEFEF"} />
      <Ui_transitionR className={""} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#66271F"} />
      <h1 style={{ backgroundColor: "#66271F", color: "#EFEFEF" }} >Ma banque de projets</h1>
      <Ui_transitionR className={""} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />

      <Gallery BackgroundFill={"#EFEFEF"} />
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#66271F"} />
      <h1 style={{ backgroundColor: "#66271F", color: "#EFEFEF" }} >Un petit résumé sur moi ?</h1>
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />
      {/* Autres sections */}
      <Timeline data={timelineData} BackgroundFill={"#EFEFEF"} />
      <Ui_transitionR className={""} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#EA5930"} />
      <p style={{ marginTop: "0px", backgroundColor: "#EA5930", color: "#00000" }}>
        <a
          className={"link"}
          href="https://drive.google.com/file/d/1jB4BNyQF-mywceCbGjFejJC7sNXyluCb/view?usp=sharing"
        >
          Télécharger mon CV
        </a>
      </p>
    </div>
  );
}
