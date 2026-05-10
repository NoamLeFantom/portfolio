import React, { useEffect } from "react";
import Head from "next/head"; // Pour gérer les balises <head>
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Ui_transitionR from "../components/Ui_transitionR";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

type ColorBackground = {
  BackgroundFill?: string;
};

const GalerieP: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  useEffect(() => {
    document.title = "noamlg-Gallerie"; // Gardé pour compatibilité, mais remplacé par <Head>
  }, []);

  return (
    <>
      {/* Balises SEO */}
      <Head>
        <title>Galerie - Noam LG</title>
        <meta name="description" content="Découvrez la galerie de Noam LG, présentant des projets créatifs et inspirants." />
        <meta name="keywords" content="galerie, portfolio, projets, Noam LG" />
        <meta name="author" content="Noam LG" />
        <meta property="og:title" content="Galerie - Noam LG" />
        <meta property="og:description" content="Découvrez la galerie de Noam LG, présentant des projets créatifs et inspirants." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.noamlg.com/galerie" />
        <meta property="og:image" content="https://www.noamlg.com/images/galerie-preview.jpg" />
      </Head>

      {/* Contenu principal */}
      <section style={{ background: `${BackgroundFill}` }}>
        <Header BackgroundFill={"#EA5930"} />
        <main>
          <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
          <Gallery BackgroundFill={"#efefef"} />
        </main>
        <Ui_transitionR className={""} BackgroundShapeFill={"#EFEFEF"} BackgroundFill={"#EA5930"} />
        <Analytics />
        <SpeedInsights />
      </section>
    </>
  );
};

export default GalerieP;
