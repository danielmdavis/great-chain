// NOTE: these values will have to be scaled to the number
// of nodes in the network.
const STRENGTH = -1000;
const NODE_RADIUS = 15;

const forceWidth = 800;
const forceHeight = 800;
const center = {x: forceWidth / 2, y: forceHeight / 2};

export function createNetworkVisualization(rawData) {
  network(formatData(rawData));
}

/*
  Format data for network visualization. D3 networks require nodes and edges.
  Nodes need to be in the following format: [{name, id}]
  Edges need to be in the following format: [{source, target}] where source
  and target are the student/teacher ids.

  Input data is the raw response object.
*/
function formatData(data) {
  // Create a list of nodes representing philosophers and edges between them.
  // Nodes must be unique, i.e., a philosoher cannot appear in the list of nodes
  // more than once.
  const nodes = [];
  const edges = [];

  const uniqueNodes = new Set();
  data.forEach(d => {
    if (!uniqueNodes.has(d.teacher.id)) {
      nodes.push(d.teacher);
      uniqueNodes.add(d.teacher.id);
    }
    if (!uniqueNodes.has(d.student.id)) {
      nodes.push(d.student);
      uniqueNodes.add(d.student.id);
    }
    edges.push({
      source: d.teacher.id,
      target: d.student.id,
      vote: d.vote,
    });
  });

  return { nodes, edges };
}

/*
  Draw the network visualization.
*/
function network(data) {
  // Sets the node id accessor so that the force simulation
  // knows that a node (philosopher) is uniquely identified by its id
  const forceLink = d3.forceLink().id(d => d.id);

  // Force function that acts upon multiple bodies. A positive
  // strength causes nodes to attract each other -- this will
  // cause nodes to collapse into each other. A negative strength
  // causes nodes to repel each other.
  const forceCharge = d3.forceManyBody().strength(STRENGTH);

  // A centering force centers the simulation at the given coordinates
  const forceCenter = d3.forceCenter(center.x, center.y);

  // Create a new simulation with the above forces
  const simulation = d3.forceSimulation()
    .force('link', forceLink)
    .force('charge', forceCharge)
    .force('center', forceCenter);

  // Create the svg element
  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', forceWidth)
    .attr('height', forceHeight);

  // Create the svg for the arrow at the end of each edge. This
  // allows you to add a "marker" to the end of each link.
  svg.append('svg:defs')
    .selectAll('marker')
    .data(['end'])  // Different link/path types can be defined here
    .enter()
    .append('svg:marker') // This section adds in the arrows
    .attr('id', String)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 15)
    .attr('refY', -1.5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6) // Play with the arrow positioning
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-4L8,0L0,4'); // This defines the path that draws the arrow. Play with arrow size.

  // Add links or edges as path elements. Group all of these
  // paths in a g element. Link width (thickness) represents
  // the edge weights. The higher the weight, i.e., the # of
  // votes a relationship recveived, the bigger the width.
  const link = svg.append('g')
    .selectAll('.link')
    .data(data.edges)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('marker-end', 'url(#end)');

  // Add node elements, grouped together. Each node represents
  // a philosopher.
  const node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', NODE_RADIUS);

  // Start the simulation
  simulation.nodes(data.nodes).on('tick', tick);
  simulation.force('link').links(data.edges);

  // This function is called on every "tick", or unit of time,
  // of the simulation. In each tick, D3 generates new node
  // positions based on the starting positions and the forces
  // chosen above. These are stored as x and y attributes of each
  // node data object. We reposition the svg links and nodes with
  // these values. You can use this function to customize the
  // positions of the nodes and links. For example, if you wanted
  // to ensure some kind of hierarchical tree structure, you could
  // give each node a level and then make sure nodes of a certain
  // level stayed above larger levels and below smaller levels.
  // The link positioning function here does something a bit more
  // sophisticated and draws curved edges instead of straight lines.
  // The nodes simply have their circle centers positioned at x,y.
  function tick() {
    link.attr('d', d => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    });

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  // Formats HTML for the node tooltips: show the book
  // title and its average rating.
  function nodeTooltipContent(d) {
    return `
      <strong>${d.name}</strong>
    `;
  }

  // Formats HTML for the link tooltips: show the two
  // book titles and the tags they have in common.
  function linkTooltipContent(d) {
    return `
      <strong>${d.source.name} &mdash; ${d.target.name}</strong>
      <p>${d.vote} people voted on this relationship</p>
    `;
  }

  function addToolTip(svg, selection, formatter) {
    const tip = d3.tip()
      .attr('class', 'tooltip')
      .html(formatter);
    svg.call(tip);
    selection
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  }

  // Initialize the tooltips
  addToolTip(svg, node, nodeTooltipContent);
  addToolTip(svg, link, linkTooltipContent);

  // // Scroll to center of network
  // window.scrollTo(
  //   (forceWidth - window.innerWidth) / 2,
  //   (forceHeight - window.innerHeight) / 2
  // );
}
