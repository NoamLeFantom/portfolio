// Définir le chemin du fichier JSON
const data = "/data/ficheMemoire.json";


async function afficherGraphTreeMap(actualRessource, nbFeuille) {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 420 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Charger les données JSON
    const data = await d3.json("/data/ficheMemoire.json");

    // Filtrer les données pour ne garder que celles liées à la ressource spécifiée
    const resourceData = data.children.find(resource => resource.name === actualRessource);

    // Vérifier si la ressource existe
    if (!resourceData) {
        console.error(`Resource '${actualRessource}' not found in the dataset.`);
        return;
    }

    const svg = d3.select("#treemap" + nbFeuille)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Convertir les données de la ressource en une structure hiérarchique pour le treemap
    const root = d3.hierarchy(resourceData).sum(function (d) { return d.value });
    const value = 1;
    const borderRadius = 5;
    d3.treemap()
        .size([width, height])
        .paddingTop(28)
        .paddingRight(7)
        .paddingInner(3)
        .tile(d3.treemapSquarify.ratio(value))
        (root);

    const getColor = (group) => {
        switch (group) {
            case "comprendre":
                return "rgb(238, 131, 131)";
            case "entreprendre":
                return "rgb(255, 172, 77)";
            case "developper":
                return "rgb(241, 241, 106)";
            case "exprimer":
                return "rgb(172, 255, 184)";
            case "concevoir":
                return "rgb(165, 197, 255)";
            default:
                return "green"; // Couleur par défaut pour les autres groupes
        }
    };
    

    svg.selectAll("rect")
        .data(root.leaves())
        .join("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style('rx', borderRadius)
        .style('ry', borderRadius)
        .style("fill", function (d) { return getColor(d.data.group); });

    const truncateText = (text, width) => {
        let textLength = text.node().getComputedTextLength();
        let textContent = text.text();
        while (textLength > width && textContent.length > 0) {
            textContent = textContent.slice(0, -1);
            text.text(textContent + '...');
            textLength = text.node().getComputedTextLength();
        }
    };

    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 + 5; })
        .attr("y", function (d) { return d.y0 + 20; })
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(function (d) { return d.data.name.replace('', ''); })
        .each(function (d) {
            truncateText(d3.select(this), d.x1 - d.x0 - 20);
        });

    svg.selectAll("vals")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 + 5; })
        .attr("y", function (d) { return d.y0 + 35; })
        .text(function (d) { return d.data.value; })
        .attr("font-size", "11px")
        .attr("fill", "white");

    svg.append("text")
        .attr("x", 0)
        .attr("y", 14)
        .text("Mot clés selon ressource")
        .attr("font-size", "10px")
        .attr("fill", "grey");
}

async function afficherGraphRadar(actualRessource, nbFeuille) {
    const width = 200;
    const height = 200;

    const colorscale = d3.scaleOrdinal(d3.schemeCategory10);

    // Charger les données à partir du fichier JSON
    try {
        const data = await d3.json("/data/ficheMemoire.json");

        // Vérifier si les données sont dans le format attendu
        if (!data || !data.children || !Array.isArray(data.children)) {
            console.error('Invalid data format');
            return;
        }

        // Utiliser une boucle pour trouver la ressource souhaitée
        let resourceData = null;
        for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].name === actualRessource) {
                resourceData = data.children[i];
                break;
            }
        }

        // Vérifier si la ressource existe
        if (!resourceData) {
            console.error(`Resource '${actualRessource}' not found in the dataset.`);
            return;
        }

        // Fonction pour obtenir les données du radar pour la ressource sélectionnée
        function getRadarData(resource) {
            const competencesArray = Object.keys(resource.autoEvalEnd[0]);
            return competencesArray.map(axis => {
                const value = +resource.autoEvalEnd[0][axis];
                return {
                    axis: axis,
                    value: value
                };
            });
        }

        // Fonction pour mettre à jour le graphique radar
        function updateRadarChart() {
            const radarData = [getRadarData(resourceData)];
            const mycfg = {
                width: width,
                height: height,
                maxValue: 1,
                levels: 5,
                ExtraWidthX: 10
            };

            // Supprimer le graphique précédent
            // d3.select("#radar" + nbFeuille).selectAll("*").remove();

            // Dessiner le nouveau graphique radar
            RadarChart.draw("#radar" + nbFeuille, radarData, mycfg);
        }

        // Initialiser le graphique radar avec la ressource sélectionnée
        updateRadarChart();
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON :', error);
    }
}

// Fonction de dessin du radar chart
const RadarChart = {
    draw: function(id, d, options) {
        const cfg = {
            radius: 5,
            width: 400,
            height: 400,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 100,
            TranslateY: 30,
            ExtraWidthX: 0,
            ExtraWidthY: 50,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if ('undefined' !== typeof options) {
            for (const i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i) {
            return d3.max(i.map(function(o) {
                return o.value;
            }));
        }));

        const allAxis = (d[0].map(function(i, j) {
            return i.axis;
        }));
        const total = allAxis.length;
        const radius = cfg.factor * Math.min(cfg.width / 2, cfg.height / 2);

        const g = d3.select(id)
            .append("svg")
            .attr("width", 400)
            .attr("height", 250)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

        let tooltip;

        // Circular segments
        for (let j = 0; j < cfg.levels; j++) {
            const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
                })
                .attr("y1", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
                })
                .attr("x2", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
                })
                .attr("y2", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
                })
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.width / 2 - levelFactor) + ", " + (cfg.height / 2 - levelFactor) + ")");
        }

        // Text indicating at what % each level is
        for (let j = 0; j < cfg.levels; j++) {
            const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data([1]) // dummy data
                .enter()
                .append("svg:text")
                .attr("x", function(d) {
                    return levelFactor * (1 - cfg.factor * Math.sin(0));
                })
                .attr("y", function(d) {
                    return levelFactor * (1 - cfg.factor * Math.cos(0));
                })
                .attr("class", "legend")
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .attr("transform", "translate(" + (cfg.width / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.height / 2 - levelFactor) + ")")
                .attr("fill", "#737373")
                .text((j + 1) * 100 / cfg.levels);
        }

        let series = 0;

        const axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.width / 2)
            .attr("y1", cfg.height / 2)
            .attr("x2", function(d, i) {
                return cfg.width / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
            })
            .attr("y2", function(d, i) {
                return cfg.height / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
            })
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d) {
                return d;
            })
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i) {
                return "translate(0, -10)";
            })
            .attr("x", function(d, i) {
                return cfg.width / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
            })
            .attr("y", function(d, i) {
                return cfg.height / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
            });

        d.forEach(function(y, x) {
            const dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i) {
                    dataValues.push([
                        cfg.width / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                        cfg.height / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie" + series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points", function(d) {
                    let str = "";
                    for (let pti = 0; pti < d.length; pti++) {
                        str = str                        + d[pti][0] + "," + d[pti][1] + " ";
                    }
                    return str;
                })
                .style("fill", function(j, i) {
                    return cfg.color(series);
                })
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function(d) {
                    const z = "polygon." + d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function() {
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series = 0;

        d.forEach(function(y, x) {
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie" + series)
                .attr('r', cfg.radius)
                .attr("alt", function(j) {
                    return Math.max(j.value, 0);
                })
                .attr("cx", function(j, i) {
                    return cfg.width / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
                })
                .attr("cy", function(j, i) {
                    return cfg.height / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
                })
                .attr("data-id", function(j) {
                    return j.axis;
                })
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
                .on('mouseover', function(d) {
                    const newX = parseFloat(d3.select(this).attr('cx')) - 10;
                    const newY = parseFloat(d3.select(this).attr('cy')) - 5;

                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(Format(d.value))
                        .transition(200)
                        .style('opacity', 1);

                    const z = "polygon." + d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function() {
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                })
                .append("svg:title")
                .text(function(j) {
                    return Math.max(j.value, 0);
                });

            series++;
        });

        // Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};

////////////////////////////////////////////////////

// Charger le fichier JSON
fetch(data)
    .then(response => response.json())
    .then(jsonData => {
        // Vérifier le contenu du JSON
        console.log('JSON Data:', jsonData);

        // Transformer le JSON en une structure désirée
        const transformJSON = (data) => {
            const transformedData = {};

            data.children.forEach(resource => {
                const ressourceName = resource.name;
                const info = resource.info;

                // Créer un objet pour la ressource si n'existe pas
                if (!transformedData[ressourceName]) {
                    transformedData[ressourceName] = [];
                }

                const resourceData = {
                    "ressource": ressourceName,
                    "matiere": ressourceName,
                    "nom": resource.nom,
                    "contexteobjectifresultats": resource.contexteobjectifresultats,
                    "productionrealisation": resource.productionrealisation,
                    "competencemethode": resource.competencemethode,
                    "bp": resource.bp,
                    "comprendrert": resource.children.filter(child => child.group === 'comprendre').reduce((acc, child) => acc + child.value, 0),
                    "comprendre": resource.children.filter(child => child.group === 'comprendre').map(child => child.name).join(', '),
                    "concevoirrt": resource.children.filter(child => child.group === 'concevoir').reduce((acc, child) => acc + child.value, 0),
                    "concevoir": resource.children.filter(child => child.group === 'concevoir').map(child => child.name).join(', '),
                    "exprimerrt": resource.children.filter(child => child.group === 'exprimer').reduce((acc, child) => acc + child.value, 0),
                    "exprimer": resource.children.filter(child => child.group === 'exprimer').map(child => child.name).join(', '),
                    "developperrt": resource.children.filter(child => child.group === 'developper').reduce((acc, child) => acc + child.value, 0),
                    "developper": resource.children.filter(child => child.group === 'developper').map(child => child.name).join(', '),
                    "entreprendrert": resource.children.filter(child => child.group === 'entreprendre').reduce((acc, child) => acc + child.value, 0),
                    "entreprendre": resource.children.filter(child => child.group === 'entreprendre').map(child => child.name).join(', ')
                };

                transformedData[ressourceName].push(resourceData);
            });

            return transformedData;
        };

        const transformedData = transformJSON(jsonData);
        console.log('Transformed JSON Data:', transformedData);

        // Conteneur pour tout le contenu
        const content = document.getElementById('content');
        let nbFeuille = 0;

        // Fonction pour obtenir les années et l'année MMI basées sur la ressource
        const getYearAndMMI = (name) => {
            const map = {
                "SAE1": { year: "2022-2023", mmi: 1 },
                "SAE2": { year: "2022-2023", mmi: 1 },
                "R1": { year: "2022-2023", mmi: 1 },
                "R2": { year: "2022-2023", mmi: 1 },
                "SAE3": { year: "2023-2024", mmi: 2 },
                "SAE4": { year: "2023-2024", mmi: 2 },
                "R3": { year: "2023-2024", mmi: 2 },
                "R4": { year: "2023-2024", mmi: 2 },
                "Alt1": { year: "2023-2024", mmi: 2 },
                "Alt2": { year: "2023-2024", mmi: 2 },
                "SAE5": { year: "2024-2025", mmi: 3 },
                "SAE6": { year: "2024-2025", mmi: 3 },
                "R5": { year: "2024-2025", mmi: 3 },
                "R6": { year: "2024-2025", mmi: 3 },
            };

            for (const key in map) {
                if (name.startsWith(key)) {
                    return map[key];
                }
            }

            return { year: "", mmi: "" };
        };

        // Parcourir chaque ressource dans le JSON transformé
        for (const ressource in transformedData) {
            if (transformedData.hasOwnProperty(ressource)) {
                transformedData[ressource].forEach(data => {
                    nbFeuille++;

                    const { year: printedYear, mmi: printedMMI_Annee } = getYearAndMMI(data.ressource);

                    const labels = [];
                    const pourcentages = [];
                    const backgroundColors = [];
                    const predefinedColors = [
                        'rgb(238, 131, 131)',
                        'rgb(255, 172, 77)',
                        'rgb(241, 241, 106)',
                        'rgb(172, 255, 184)',
                        'rgb(165, 197, 255)'
                    ];

                    let maxPercentage = 0;
                    let maxKey = '';

                    for (const key in data) {
                        if (data.hasOwnProperty(key) && key.endsWith("rt")) {
                            const label = key.slice(0, -2);
                            const value = data[key];
                            labels.push(label);
                            pourcentages.push(value);
                            const color = predefinedColors[labels.length % predefinedColors.length];
                            backgroundColors.push(color);

                            if (value > maxPercentage) {
                                maxPercentage = value;
                                maxKey = label;
                            }
                        }
                    }

                    const feuilleContainer = document.createElement('div');
                    feuilleContainer.id = `feuilleContainer${nbFeuille}`;

                    const feuille = document.createElement('div');
                    feuille.classList.add('feuille');
                    feuille.id = `feuille${nbFeuille}`;

                    const header = `
                        <div class="header">
                            <div class="basic_Information-Container">
                                <div class="name_Info">
                                    <h1 style="font-size: 0.8rem;">Noam LE GARSMEUR</h1>
                                    <h2 style="font-size: 0.7rem;">A1/BUT MMI Année ${printedMMI_Annee}</h2>
                                    <h4 style="font-size: 0.6rem;">${printedYear}</h4>
                                </div>
                                <div class="ressource-matiere">
                                    <h2 style="font-size: 0.7rem;" class="${maxKey}">Matière : ${data.ressource}, ${data.nom}</h2>
                                </div>
                            </div>
                            <div class="iut_universite_logos-container">
                                <img src="css/images/logos/logo-iutLannion.svg" alt="logo iut Lannion">
                                <img class="imgRennes" src="css/images/logos/logo-univRennes.svg" alt="Logo Rennes1">
                            </div>
                        </div>
                        <hr>
                        <hr>`;

                    const competences = `
                        <div class="competences-container">
                            <h3 style="font-size: 0.65rem;" >Apports (100%) :</h3>
                            <div class="liste-competences-container">
                                <h4 class="list comprendre">Comprendre : ${data.comprendrert}% | mots clefs : ${data.comprendre}</h4>
                                <h4 class="list concevoir">Concevoir : ${data.concevoirrt}% | mots clefs : ${data.concevoir}</h4>
                                <h4 class="list exprimer">Exprimer : ${data.exprimerrt}% | mots clefs : ${data.exprimer}</h4>
                                <h4 class="list developper">Développer : ${data.developperrt}% | mots clefs : ${data.developper}</h4>
                                <h4 class="list entreprendre">Entreprendre : ${data.entreprendrert}% | mots clefs : ${data.entreprendre}</h4>
                            </div>
                        </div>
                        <hr>
                        <hr>`;

                    const illustration = `
                        <h3 style="font-size: 0.7rem;">Illustration du travail réalisé :</h3>
                        <div class="illu_comp">
                            <div class="illuProjet">
                                <img src="../data/images/${data.ressource}.png" alt="Image concernant mon projet">
                            </div>
                            <div class="comp_print">
                                <canvas id="graph${nbFeuille}" width="205" height="160"></canvas>
                            </div>
                        </div>
                        <hr>
                        <hr>`;

                    const replaceWithBr = (text) => {
                        return text ? text.replace(/\n/g, '<br>') : '';
                    };

                    const explicContent = `
                    <div class="explicContentContainer">
                        <div class="expliContainer context">
                            <h2 style="font-size: 0.7rem;" style="font-size: 0.8rem;">Contexte & objectifs de résultats</h2>
                            <p style="font-size: 0.65rem;">${replaceWithBr(data.contexteobjectifresultats)}</p>
                        </div>
                        <hr class="innerExplic">
                        <div class="expliContainer production">
                            <h2 style="font-size: 0.7rem;">Production / travail réalisé</h2>
                            <p style="font-size: 0.65rem;">${replaceWithBr(data.productionrealisation)}</p>
                        </div>
                        <hr class="innerExplic">
                        <div class="expliContainer competence" id="competence${nbFeuille}" style="overflow:hidden;">
                            <h2 style="font-size: 0.7rem;">Compétences – méthodes : mobilisées / développées / acquises</h2>
                            <p style="font-size: 0.65rem;">${replaceWithBr(data.competencemethode)}</p>
                        </div>
                        <hr class="innerExplic">
                        <div class="expliContainer bilanPerso" id="bilanPerso${nbFeuille}" style="overflow:hidden;">
                            <h2 style="font-size: 0.7rem;" style="font-size: 0.8rem;">Bilan Personnel :</h2>
                            <p style="font-size: 0.65rem;">${replaceWithBr(data.bp)}</p>
                        </div>
                    </div>`;

                    feuille.innerHTML = header + competences + illustration + explicContent;
                    feuilleContainer.appendChild(feuille);
                    content.appendChild(feuilleContainer);

                    const hauteurFeuille = document.getElementById(`feuille${nbFeuille}`).offsetHeight;
                    let hauteurASoustraire = 594 - hauteurFeuille;//height
                    let hauteurFeuille_2 = 594 + hauteurASoustraire;
                    let nouvelleDiv = document.createElement('div');

                    // Attribution de l'ID à la div
                    nouvelleDiv.id = `feuille${nbFeuille}_2`;

                    // Ajout du style à la div directement en JavaScript
                    nouvelleDiv.style.backgroundColor = 'white';
                    nouvelleDiv.style.width = '420px';
                    nouvelleDiv.style.display = 'flex';
                    nouvelleDiv.style.flexDirection = 'column';
                    nouvelleDiv.style.height = hauteurFeuille_2 + 'px';


                    const labelChoiceSelect = `
                <div class='graphique' id='treemap${nbFeuille}'></div>
                
                <div class='graphique' id='radar${nbFeuille}' style='align-self:center'></div>`
                    const treeMap = afficherGraphTreeMap(data.ressource, nbFeuille);
                    const radarMap = afficherGraphRadar(data.ressource, nbFeuille);
                    nouvelleDiv.innerHTML = labelChoiceSelect + treeMap + radarMap;
        
                    // Ajout de la div au conteneur
                    document.getElementById(`feuilleContainer${nbFeuille}`).appendChild(nouvelleDiv);

                    const ctx = document.getElementById(`graph${nbFeuille}`).getContext('2d');
                    new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: `Ressource ${data.ressource}`,
                                data: pourcentages,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: backgroundColors,
                                borderWidth: 0
                            }]
                        },
                        options: {
                            scales: {
                                r: {
                                    pointLabels: {
                                        font: {
                                            size: 8 // Taille des labels autour du radar
                                        }
                                    },
                                    ticks: {
                                        z: 10,
                                        backgroundColors: 'rgba(75, 192, 192, 0.2)',
                                        font: {
                                            size: 8 // Taille des ticks (graduations)
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        font: {
                                            size: 1 // Taille des labels de la légende
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            }
        }
    })
    .catch(error => console.error('Error loading JSON:', error));