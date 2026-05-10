// Fonction pour tracer le sunburst
function sunburstGraph(root, ID) {
    const width = 900;
    const height = 600;
    const margin = 1;
    const radius = Math.min(width, height) / 2;
    const color = d3.interpolateRainbow;
    const fill = "#ccc";
    const fillOpacity = 0.6;

    const rootHierarchy = d3.hierarchy(root)
        .sum(d => d.children ? 0 : 1)
        .sort((a, b) => b.value - a.value);

    d3.partition().size([2 * Math.PI, radius])(rootHierarchy);

    const colorScale = d3.scaleSequential([0, rootHierarchy.children.length], color).unknown(fill);
    rootHierarchy.children.forEach((child, i) => child.index = i);

    const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 2 * 1 / radius))
        .padRadius(radius / 2)
        .innerRadius(d => d.y0) // Correction ici
        .outerRadius(d => d.y1 - 1)
        .cornerRadius(10);

    d3.select(ID).selectAll("svg").remove(); // Supprime l'ancien graphique

    const svg = d3.select(ID)
        .append("svg")
        .attr("viewBox", [
            -width / 2,
            -height / 2,
            width,
            height
        ])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle");

    svg.selectAll("path")
        .data(rootHierarchy.descendants())
        .join("path")
        .attr("d", arc)
        .attr("fill", d => colorScale(d.ancestors().reverse()[1]?.index))
        .attr("fill-opacity", fillOpacity)
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(d.data.name);
        })
        .on("mousemove", event => {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("display", "none");
        })
        .on("click", click);

    // Ajout des textes avec troncature
    svg.selectAll("text")
        .data(rootHierarchy.descendants())
        .join("text")
        .attr("transform", d => {
            const x = ((d.x0 + d.x1) / 2) * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.32em")
        .text(d => truncateText(d.data.name, 7))
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .style("pointer-events", "none");

    function click(d) {
        // Fade out all text elements
        svg.selectAll("text").transition().attr("opacity", 0);

        // Transition des arcs pour le zoom
        svg.selectAll("path").transition()
            .duration(750)
            .attrTween("d", arcTween(d))
            .each("end", function (e, i) {
                // Vérifie si le segment est dans l'angle visible après zoom
                if (e.x0 >= d.x0 && e.x1 <= d.x1) { // Correction ici
                    // Sélectionne le texte associé et le fait réapparaître
                    var arcText = d3.select(this.parentNode).select("text");
                    arcText.transition().duration(750)
                        .attr("opacity", 1)
                        .attr("transform", function () { return "rotate(" + computeTextRotation(e) + ")" })
                        .attr("x", function (d) { return y(d.y); });
                }
            });
    }

    // Fonction d'interpolation pour les transitions de zoom
    function click(event, p) {
        parent.datum(p.parent || root);
    
        root.each(d => d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        });
    
        const t = svg.transition().duration(750);
    
        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween("data", d => {
              const i = d3.interpolate(d.current, d.target);
              return t => d.current = i(t);
            })
          .filter(function(d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none") 
    
            .attrTween("d", d => () => arc(d.current));
    
        label.filter(function(d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
          }).transition(t)
            .attr("fill-opacity", d => +labelVisible(d.target))
            .attrTween("transform", d => () => labelTransform(d.current));
      }

    // Fonction pour tronquer le texte
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }
    
      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }
}
// Charger les données et tracer le sunburst
d3.json("/data/Referentiel-des-softskills-Referentiel_Softskills_tsv.json").then(data => {
    sunburstGraph(data, "#sunburstGraph");
});

// Ajouter le tooltip au body
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");