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
                    "skill": "HTML5",
                    "class": "dev",
                    "level": 5
                },
                {
                    "skill": "d3.js",
                    "class": "dev",
                    "level": 3
                },
            ]
        };

        // chart area
        let svg = d3.select(this.chartContainer)
            .append("svg")
            .attr('id', this.svgId)
            .attr('width', this.width)
            .attr('height', this.height);

        //background area
        let background = this.initBackground(this, svg);

        // Holds child components (nodes, links), i.e. all but the background
        let svgGroup = svg
            .append('svg:g')
            .attr("id", "svgGroup");
        this.svgGroup = svgGroup;

        // Holds nodes
        let graphNodesGroup =
            svgGroup
            .append("g")
            .attr("id", `nodes_${this.svgId}`)
            .attr("class", "nodes");
        this.graphNodesGroup = graphNodesGroup;

        // Simulation
        let simulation = this.initSimulation();
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
        let result = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(-70))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        return result;

    }

    handleBackgroundClicked() {
        console.log(`background clicked`);
    }

    handleNodeClicked(d) {
        console.log(`node clicked`);
    }


    update(t, simulation) {
        let nodes = t.chartData.nodes;

        // nodes
        let graphNodeCircles = t.graphNodesGroup.selectAll("circle")
            .data(nodes)
            .enter().append("g");

        let circles = graphNodeCircles.append("circle")
            .attr("r", d=> {return d.level * 15;})
            .style("fill",d=>{
                switch(d.class){
                    case "dev":
                    return "#555584";
                }
            });

        let text = graphNodeCircles.append("text")
            .text(d=>{return d.skill;});

        //apply simulation
        simulation
            .nodes(nodes)
            .on("tick", handleTicked)

        function handleTicked() {
            graphNodeCircles.
            attr("transform", d => {
                return 'translate(' + [d.x, d.y] + ')';
            })
        }


    }
}