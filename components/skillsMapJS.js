import * as d3 from "d3";

export function createForceGraph(container, data, legendData) {
  const width = 1000;
  const height = 350;

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
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Liens
  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value || 1));

  // Nœuds
  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => (d.highlighted ? 6 : 5)) // Augmente la taille des ressources
    .attr("fill", (d) => (d.highlighted ? "#53c19b" : color(d.group))) // Couleur spéciale pour les ressources
    .attr("stroke", (d) => (d.highlighted ? "#2c624f " : "#")); // Bordure différente pour les ressources

  // Etiquettes (texte visible pour les ressources uniquement)
  svg
    .selectAll(".label")
    .data(nodes)
    // .join("text")
    // .filter((d) => d.highlighted) // Seulement pour les ressources
    // .attr("class", "label")
    // .attr("x", 10)
    // .attr("y", 5)
    // .text((d) => d.id)
    // .attr("fill", "#ff5722")
    // .attr("font-size", "8px")
    // .attr("display","hidden")
    // .attr("font-weight", "regular")
    ;

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

    svg.selectAll(".label")
      .attr("x", (d) => d.x + 10)
      .attr("y", (d) => d.y + 5);
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
    .style("margin-top", "10px");

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
