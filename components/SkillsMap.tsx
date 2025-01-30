import React, { useEffect, useRef, useState } from "react";
import { createForceGraph } from "../components/skillsMapJS.js";
import styles from "../styles/SkillsMap.module.scss";

type Node = {
  id: string;
  group: number;
  [key: string]: any; // Permet de gérer des champs additionnels dans les nœuds
};

type Link = {
  source: string | Node;
  target: string | Node;
  value?: number;
};

type SkillsData = {
  nodes: Node[];
  links: Link[];
};

type LegendItem = {
  color: string;
  label: string;
};

type ForceGraphProps = {
  data: SkillsData;
  legend: LegendItem[];
  resourceDetails: any; // Les détails des ressources provenant d'un fichier JSON
};


const ForceGraph: React.FC<ForceGraphProps> = ({ data, legend }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resourceDetails, setResourceDetails] = useState<any | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Charger le JSON avec fetch
    fetch("/src/ficheMemoire/data/ficheMemoire.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du JSON.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données chargées :", data);
        setResourceDetails(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (containerRef.current && resourceDetails) {
      createForceGraph(containerRef.current, data, legend, (node : Node) => {
        const details = resourceDetails.children?.find(
          (item : any) => item.nom === node.id
        );
        setSelectedDetails(details || { message: "Aucun détail disponible." });
        setIsPopupOpen(true);
      });
    }
  }, [data, legend, resourceDetails]);

  return (
    <div>
      <div style={{ top: "45px", position: "relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <h1>Arbre de compétences développé et leur projet (Data viz)</h1>
        <div className={styles.skillsDataViz} ref={containerRef}></div>
      </div>

      {isPopupOpen && (
        <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setIsPopupOpen(false)}
            >
              ✖
            </button>
            <h3>Détails du nœud</h3>
            {selectedDetails?.message ? (
              <p>{selectedDetails.message}</p>
            ) : (
              <div>
                <h4>Informations générales</h4>
                <p><strong>Nom :</strong> {selectedDetails.nom}</p>
                <p><strong>Matière :</strong> {selectedDetails.matiere}</p>
                <p><strong>Volume horaire :</strong> {selectedDetails.volumeHoraire} (TP : {selectedDetails.volumeHoraireTP})</p>
                <h4>Contexte et Objectifs</h4>
                <p>{selectedDetails.contexteobjectifresultats}</p>
                <h4>Productions/Réalisations</h4>
                <p>{selectedDetails.productionrealisation}</p>
                <h4>Compétences/Méthodes</h4>
                <p>{selectedDetails.competencemethode}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        
      `}</style>
    </div>
  );
};

export default ForceGraph;
