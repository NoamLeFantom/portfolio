import React from "react";
import Timeline from "../components/Timeline";
import Gallery from "../components/Gallery";
import timelineData from "../public/src/data/timeline.json";
import Header from "../components/Header";
import Presentation from "../components/Presentation";
import Ui_transitionR from "../components/Ui_transitionR";



export default function Home() {
  return (
    <div>
      <Header />
      <Presentation/>
      <Ui_transitionR/>
      <h1>Projet test</h1>
      <Gallery />
      {/* Autres sections */}
      <Timeline data={timelineData} />
      <Ui_transitionR/>
    </div>
  );
}
