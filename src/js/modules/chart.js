import * as d3 from 'd3'

export default class Chart {
  constructor (chartContainer, svgId) {
    /// //// Chart magic numbers /////////
    this.chargeStrength = 50
    this.collisionStrength = 16

    this.chartContainer = chartContainer
    this.svgId = svgId
    this.width = this.chartContainer.offsetWidth
    this.height = this.chartContainer.offsetHeight

    // svg add responsivity
    const svg = d3.select(this.chartContainer)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(responsivefy)

    function responsivefy (svg) {
      let container = d3.select(svg.node().parentNode)
      let width = parseInt(svg.style('width'))
      let height = parseInt(svg.style('height'))
      let aspect = width / height

      svg.attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('perserveAspectRatio', 'xMinYMid')
        .call(resize)

      d3.select(window).on('resize.' + container.attr('id'), resize)

      function resize () {
        var targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
      }
    }

    this.svg = svg

    // definitions of patterns
    const defs = svg.append('defs')
    const pattern = defs.append('pattern')
      .attr('id', 'stripes-1')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 10)
      .attr('height', 10)
    const image = pattern.append('image')
      .attr('xlink:href', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2JiZDgxNyI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhOWNlMDAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhOWNlMDAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
    this.defs = defs

    // group for the circles
    const graphNodesGroup =
            this.svg
              .append('g')
              .attr('id', `nodes_${this.svgId}`)
              .attr('class', 'nodes')
    this.graphNodesGroup = graphNodesGroup
  }

  async init () {
    // retrieve data for nodes
    const data = await d3.json('../data.json')
    this.chartData = data

    // create groups and bind data
    const graphNodeCircles = this.graphNodesGroup.selectAll('circle')
      .data(data.nodes)
      .enter().append('g')

    // create and append circles
    const circles = graphNodeCircles.append('circle')
      .attr('r', d => {
        return d.level * this.collisionStrength - d.level
      })
      .style('fill', d => {
        switch (d.class) {
          case 'dev':
            return 'url(#stripes-1) #222'

          case 'des':
            return '#223567'

          case 'lang':
            return '#547902'
        }
      })

    const text = graphNodeCircles.append('text')
      .text(d => {
        return d.skill
      })
      .attr('x', 0)
      .attr('y', 4)
      .attr('text-anchor', 'middle')
      .style('font-size', d => {
        switch (d.level) {
          case 1:
            return '0.6em'
          case 2:
            return '0.7em'
          default:
            return '0.8em'
        }
      })

    this.graphNodeCircles = graphNodeCircles

    // Simulation
    const simulation = this.initSimulation()
    this.simulation = simulation

    // update();
    this.update(this, simulation)
  }

  initSimulation () {
    let result = d3.forceSimulation()
      .force('center', d3.forceCenter(this.width / 2, this.height / 1.8))
      .force('charge', d3.forceManyBody().strength(this.chargeStrength))
      .force('collision', d3.forceCollide().radius(d => {
        return d.level * this.collisionStrength
      }))
    return result
  }

  update (t, simulation) {
    const nodes = t.chartData.nodes

    simulation
      .nodes(nodes)
      .on('tick', handleTicked)

    function handleTicked () {
      t.graphNodeCircles
        .attr('transform', d => {
          return `translate(${[d.x, d.y]})`
        })
    }
  }
}
