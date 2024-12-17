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
    <div class='GlobalPage'>
      <Header />
      <Presentation/>
      <Ui_transitionR className={"Left"}/>
      <h1>Ma banque de projets</h1>
      <p>Découvrez l'ensemble de mes projets</p>
      <p>Vous pouvez trier ces derniers par domaines (3D, photos, vidéos...)</p>
      <Gallery />
      {/* Autres sections */}
      <Timeline data={timelineData} />
      <Ui_transitionR/>
    </div>
  );
}
