import React, { useEffect, useRef } from "react";
import { createForceGraph } from "../components/skillsMapJS.js";


const ForceGraph = ({ data, legend }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      createForceGraph(containerRef.current, data, legend);
    }
  }, [data, legend]);

  return <div className={"skillsDataViz"} ref={containerRef}></div>;
};

export default ForceGraph;
