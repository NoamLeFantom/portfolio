import React from "react";
import Timeline from "../components/Timeline";
import timelineData from "../public/src/data/timeline.json";
import Header from "../components/Header";
import HP_Presentation from "../components/HP_Presentation";
import HP_PresProjects from "../components/HP_PresProjects";
import Ui_transitionR from "../components/Ui_transitionR";
import { useEffect } from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  useEffect(() => {
    document.title = "noamlg-portfolio";
    document.documentElement.lang = "fr";
  }, []); // Le titre sera défini quand le composant est monté
  return (
    <div className={'GlobalPage'}>
      <SpeedInsights />
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      <Header BackgroundFill={"#EA5930"} />
      <main>
        <HP_Presentation BackgroundFill={"#EFEFEF"} />
        <Ui_transitionR className={""} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#66271F"} />
        <h1 className={"homeSubTitle"} style={{ backgroundColor: "#66271F", color: "#EFEFEF"}} >Voir quelques projets</h1>
        <Ui_transitionR className={""} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />
        <HP_PresProjects BackgroundFill={"#EFEFEF"} />
        
        <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#66271F"} />
        <h1 className={"homeSubTitle"} style={{ backgroundColor: "#66271F", color: "#EFEFEF"}} >Un petit résumé sur moi ?</h1>
        <Ui_transitionR className={"Left"} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />
        {/* Autres sections */}
        <Timeline data={timelineData} BackgroundFill={"#EFEFEF"} />
        <Ui_transitionR className={""} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#EA5930"} />
      </main>
    </div>
  );
}
