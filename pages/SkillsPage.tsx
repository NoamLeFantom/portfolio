import React, { useEffect, useState } from "react";
import ForceGraph from "../components/SkillsMap";
import Header from "../components/Header";
import skillsData from "../public/src/data/skills.json";
import Ui_transitionR from "../components/Ui_transitionR";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const legendData = [
  { color: "#1f77b4", label: "Entreprendre" },
  { color: "#ff7f0e", label: "Comprendre" },
  { color: "#2ca02c", label: "Développer" },
  { color: "#D62728", label: "Concevoir" },
  { color: "#9467BD", label: "Exprimer" },
];

const SkillsPage = () => {
  const [resourceDetails, setResourceDetails] = useState<any | null>(null);

  useEffect(() => {
    fetch("/src/ficheMemoire/data/ficheMemoire.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du JSON.");
        }
        return response.json();
      })
      .then((data) => {
        setResourceDetails(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={"GlobalPage"}>
      <Header BackgroundFill={"#EA5930"} />
      {resourceDetails && (
        <ForceGraph
          data={skillsData}
          legend={legendData}
          resourceDetails={resourceDetails} // Passer les détails ici
          
        />
      )}
<Ui_transitionR className={""} BackgroundShapeFill={"#d7d7d7"} BackgroundFill={"#EA5930"} />

<Analytics /><SpeedInsights />

    </div>
  );
};

export default SkillsPage;
