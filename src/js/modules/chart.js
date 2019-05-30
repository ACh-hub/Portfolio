import * as d3 from 'd3';

export default class Chart {
    constructor(chartContainer, svgId) {
        this.chartContainer = chartContainer;
        this.svgId = svgId;
    }


    init() {

        this.height = this.chartContainer.offsetHeight;
        this.width = this.chartContainer.offsetWidth;

        this.chartData = {
            "nodes": [{
                    "skill": "Javascript (ES6)",
                    "class": "dev",
                    "level": 4
                },
                {
                    "skill": "CSS3",
                    "class": "dev",
                    "level": 4
                },
                {
                    "skill": "Sass",
                    "class": "dev",
                    "level": 4
                },
                {
                    "skill": "Bootstrap",
                    "class": "dev",
                    "level": 1
                },
                {
                    "skill": "Git",
                    "class": "dev",
                    "level": 4
                },
                {
                    "skill": "HTML5",
                    "class": "dev",
                    "level": 5
                },
                {
                    "skill": "Webpack",
                    "class": "dev",
                    "level": 1
                },
                {
                    "skill": "Gulp",
                    "class": "dev",
                    "level": 1
                },
                {
                    "skill": "d3.js",
                    "class": "dev",
                    "level": 3
                },
                {
                    "skill": "C++",
                    "class": "dev",
                    "level": 3
                },
                {
                    "skill": "Java",
                    "class": "dev",
                    "level": 1
                },
                {
                    "skill": "Photoshop",
                    "class": "des",
                    "level": 3
                },
                {
                    "skill": "RWD",
                    "class": "des",
                    "level": 1
                },
                {
                    "skill": "Figma",
                    "class": "des",
                    "level": 1
                },
                {
                    "skill": "Polish",
                    "class": "lang",
                    "level": 5
                },
                {
                    "skill": "English",
                    "class": "lang",
                    "level": 4
                },
                {
                    "skill": "French",
                    "class": "lang",
                    "level": 1
                },
                {
                    "skill": "Russian",
                    "class": "lang",
                    "level": 2
                },
            ]
        };

        // chart svg
        const svg = d3.select(this.chartContainer)
            .append("svg")
            .attr('id', this.svgId)
            .attr('width', this.width)
            .attr('height', this.height)
            .call(responsivefy);

            function responsivefy(svg) {
                var container = d3.select(svg.node().parentNode),
                    width = parseInt(svg.style("width")),
                    height = parseInt(svg.style("height")),
                    aspect = width / height;

                svg.attr("viewBox", "0 0 " + width + " " + height)
                    .attr("perserveAspectRatio", "xMinYMid")
                    .call(resize);
            
                d3.select(window).on("resize." + container.attr("id"), resize);
            
                function resize() {
                    var targetWidth = parseInt(container.style("width"));
                    svg.attr("width", targetWidth);
                    svg.attr("height", Math.round(targetWidth / aspect));
                }
            }


        // definitions for patterns
        const defs = svg.append("defs");
        const pattern = defs.append("pattern")
        .attr("id","stripes-1")
        .attr("patternUnits","userSpaceOnUse")
        .attr("width",10)
        .attr("height",10);
        const image = pattern.append("image")
        .attr("xlink:href","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2JiZDgxNyI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhOWNlMDAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhOWNlMDAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=")
        .attr("x",0)
        .attr("y",0)
        .attr("width",10)
        .attr("height",10);

        //background area
        const background = this.initBackground(this, svg);

        // Holds child components (nodes, links), i.e. all but the background
        const svgGroup = svg
            .append('svg:g')
            .attr("id", "svgGroup");
        this.svgGroup = svgGroup;

        // Holds nodes
        const graphNodesGroup =
            svgGroup
            .append("g")
            .attr("id", `nodes_${this.svgId}`)
            .attr("class", "nodes");
        this.graphNodesGroup = graphNodesGroup;

        // Simulation
        const simulation = this.initSimulation();
        this.simulation = simulation;

        // update();
        this.update(this, simulation);

    }

    initBackground(t, svg) {
        let result = svg
            .append("rect")
            .attr("id", "backgroundId")
            .attr("fill", "#F2F7F0")
            .attr("class", "view")
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", t.width - 1)
            .attr("height", t.height - 1)
            .on("click", () => t.handleBackgroundClicked());

        return result;
    }

    initSimulation() {
  // Features of the forces applied to the nodes:


        let result = d3.forceSimulation()
            .force('center', d3.forceCenter(this.width / 2, this.height/1.8))
            .force("charge", d3.forceManyBody().strength(50))
            .force('collision', d3.forceCollide().radius(d=>{
                return d.level*16;
            }))
        return result;

    }

    handleBackgroundClicked() {
        console.log(`background clicked`);
    }

    handleNodeClicked(d) {
        console.log(`node clicked`);
    }

    update(t, simulation) {
        const nodes = t.chartData.nodes;

        // nodes
        const graphNodeCircles = t.graphNodesGroup.selectAll("circle")
            .data(nodes)
            .enter().append("g");

        const circles = graphNodeCircles.append("circle")
            .attr("r", d => {
                return d.level * 15;
            })
            .style("fill", d => {
                switch (d.class) {
                    case "dev":
                        return "url(#stripes-1) #222";

                    case "des":
                        return "#223567";

                    case "lang":
                        return "#547902";
                }
            });

        const text = graphNodeCircles.append("text")
            .text(d => {
                return d.skill;
            })
            .attr("x", 0)
            .attr("y", 4)
            .attr("text-anchor", "middle");

        //apply simulation
        simulation
            .nodes(nodes)
            .on("tick", handleTicked)

        function handleTicked() {
            graphNodeCircles.
            attr("transform", d => {
                return `translate(${[d.x, d.y]})`;
            })
        }

    }
}

