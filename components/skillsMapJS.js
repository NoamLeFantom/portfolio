import * as d3 from "d3";

export function createForceGraph(container, data, legendData, onNodeClick) {
  const width = 1000;
  const height = 1000;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const links = data.links.map((d) => ({ ...d }));
  const nodes = data.nodes.map((d) => ({
    ...d,
    highlighted: d.id.startsWith("Ressource"), // Ajouter une propriété pour repérer les ressources
  }));

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d) => d.id))
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  d3.select(container).selectAll("*").remove();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width /2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Créez un conteneur pour afficher les détails
  

  // Liens
  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value || 10));

  // Nœuds
  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => (d.highlighted ? 10 : 5))
    .attr("fill", (d) => (d.highlighted ? "#ff9800" : color(d.group)))
    .on("click", (event, d) => {
      if (onNodeClick) onNodeClick(d); // Appelle la fonction si définie
    }); // Appel de la callback lors du clic sur un nœud

  node.append("title").text((d) => d.id);

  node.call(
    d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  );

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // Ajouter la légende
  const legend = d3
    .select(container)
    .append("div")
    .attr("class", "legend")
    .style("display", "flex")
    .style("gap", "10px")
    .style("margin-top", "10px")
    .style("flex-direction","row")
    .style("flex-wrap","wrap")

  legendData.forEach((item) => {
    const legendItem = legend
      .append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("gap", "5px");
    legendItem
      .append("div")
      .style("width", "15px")
      .style("height", "15px")
      .style("background-color", item.color);
    legendItem.append("span").text(item.label);
  });

  return svg.node();
}
