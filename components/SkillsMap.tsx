import React, { useEffect, useRef } from "react";
import { createForceGraph } from "../components/skillsMapJS.js";

type Node = {
  id: string;
  group: number;
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
};

const ForceGraph: React.FC<ForceGraphProps> = ({ data, legend }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      createForceGraph(containerRef.current, data, legend);
    }
  }, [data, legend]);

  return <div className={"skillsDataViz"} ref={containerRef}></div>;
};

export default ForceGraph;
