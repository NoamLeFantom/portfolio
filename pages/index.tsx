import React from "react";
import Timeline from "../components/Timeline";
import timelineData from "../public/src/data/timeline.json";
import Header from "../components/Header";
import HP_Presentation from "../components/HP_Presentation";
import HP_PresProjects from "../components/HP_PresProjects";
import HP_Top from "../components/HP_Top";
import Ui_transitionR from "../components/Ui_transitionR";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function Home() {
  useEffect(() => {
    document.title = "noamlg-portfolio";
    document.documentElement.lang = "fr";
  }, []); // Le titre sera défini quand le composant est monté
  return (
    <div className={'GlobalPage'}>
      <Header BackgroundFill={"#EA5930"} />
      <Ui_transitionR className={"transitionLeft transitionSpecial"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      <main>
        <HP_Top BackgroundFill={"#EFEFEF"} />
        <Ui_transitionR className={"transitionyYInvert transitionLeft"} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />
        <h1 className={"homeSubTitle"} style={{ backgroundColor: "#66271F", color: "#EFEFEF"}} >Voir quelques projets</h1>
        <Ui_transitionR className={""} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />
        <HP_PresProjects BackgroundFill={"#EFEFEF"} />
        
        <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#66271F"} />
        <h1 className={"homeSubTitle"} style={{ backgroundColor: "#66271F", color: "#EFEFEF"}} >Un petit résumé sur moi ?</h1>
        <Ui_transitionR className={"Left"} BackgroundShapeFill={"#66271F"} BackgroundFill={"#EFEFEF"} />
        {/* Autres sections */}
        <HP_Presentation BackgroundFill={"#EFEFEF"} />

        <Timeline data={timelineData} BackgroundFill={"#EFEFEF"} />
        <Ui_transitionR className={""} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#EA5930"} />
        <Analytics />
        <SpeedInsights />
      </main>
    </div>
  );
}
