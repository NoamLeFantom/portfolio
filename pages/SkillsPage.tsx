import React from "react";
import ForceGraph from "../components/SkillsMap";
import Header from "../components/Header";
import skillsData from "../public/src/data/skills.json";

const legendData = [
    { color: "#1f77b4", label: "Entreprendre" },
    { color: "#ff7f0e", label: "Comprendre" },
    { color: "#2ca02c", label: "Développer" },
    { color: "#D62728", label: "Concevoir" },
    { color: "#9467BD", label: "Exprimer" },
  ];

const App = () => {
    return (
        <div className={"GlobalPage"}>
            <Header BackgroundFill={"#E0694B"}/>
            <ForceGraph data={skillsData} legend={legendData} />
        </div>
    );
};

export default App;
