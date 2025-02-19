import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Ui_transitionR from "../components/Ui_transitionR";


type ColorBackground = {
  BackgroundFill?: string;
};

const GalerieP: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  useEffect(() => {
    document.title = "noamlg-Gallerie";
  }, []); // Le titre sera défini quand le composant est monté

  return (
    <section style={{ background: `${BackgroundFill}` }} >
      <Header BackgroundFill={"#EA5930"} />
      <main>
        <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
        <Gallery BackgroundFill={"#efefef"} />
      </main>
    </section>
  );
};

export default GalerieP;
