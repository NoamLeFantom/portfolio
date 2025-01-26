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
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#E0694B"} BackgroundFill={"#4EDB7D"}/>
      <Header BackgroundFill={"#E0694B"}/>
      <Presentation BackgroundFill={"#4EDB7D"}/>
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#4EDB7D"} BackgroundFill={"#68BD84"}/>
      <Gallery BackgroundFill={"#68BD84"}/>
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#68BD84"} BackgroundFill={"#000000"}/>
      <h1>Ma banque de projets</h1>
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#000000"} BackgroundFill={"#ffffff"}/>
      {/* Autres sections */}
      <Timeline data={timelineData} />
      <Ui_transitionR className={""} BackgroundShapeFill={"#ADADAD"} BackgroundFill={"#000000"}/>
      <Ui_transitionR className={"Left yInvert"} BackgroundShapeFill={"#AffDAD"} BackgroundFill={"#000000"}/>
      <Ui_transitionR className={""} BackgroundShapeFill={"#AffDAD"} BackgroundFill={"#000000"}/>
      < a
        className={"link"}
        href="https://drive.google.com/file/d/1jB4BNyQF-mywceCbGjFejJC7sNXyluCb/view?usp=sharing"
      >
        Télécharger mon CV
      </a>
    </div>
  );
}
