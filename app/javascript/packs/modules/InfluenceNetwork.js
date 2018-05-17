import * as d3 from "d3";

/*
  Some of the code inspired/borrowed from http://bl.ocks.org/mbostock/1153292
*/

// For images
const dummyUrl = 'https://cdn-images-1.medium.com/max/1600/1*eLDH_qnNczZ8jOjd0vbbfw.gif';
const imageWidth = 20;
const imageRadius = imageWidth / 2;

// NOTE: this value might need to be scaled to the number
// of nodes in the network.
const STRENGTH = -1000;

const forceWidth = 800;
const forceHeight = 800;
const center = {x: forceWidth / 2, y: forceHeight / 2};

export default function createNetworkVisualization(rawData) {
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
    const { teacher, student } = d;

    // TODO this just adds a dummy image url (Nietzsche). Remove this when real
    // image urls are being returned.
    teacher.img = dummyUrl;
    student.img = dummyUrl;

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
  const defs = svg.append('svg:defs');

  defs.selectAll('marker')
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
    .attr('d', 'M0,-5L10,0L0,5'); // This defines the path that draws the arrow. Play with arrow size.

  // Clip path used to mask the images, so that they appear as circles
  const clipPath = defs.append('clipPath').attr('id', 'image-clip');

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

// svg.append("image")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", AVATAR_WIDTH)
//   .attr("height", AVATAR_WIDTH)
//   .attr("xlink:href", myAvatarUrl)
//   .attr("clip-path", "url(#avatar-clip)")
//   .attr("transform", "translate(posx, posy)")
//   .append('My username')

  // Create a circle mask for each node, so that each image can
  // take the shape of a circle.
  const clip = clipPath.selectAll('.clip')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'clip')
    .attr('r', imageRadius);

  // Add node elements, grouped together. Each node represents
  // a philosopher.
  const node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('image')
    .attr('class', 'node')
    .attr('xlink:href', d => d.img)
    .attr('width', imageWidth)
    .attr('height', imageWidth);
    // .attr('clip-path', 'url(#image-clip)');

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

    // The x,y attributes of images correspond to their top-left corner.
    // To center them as we would with circles, displace them to the left
    // and up by half their width.
    node
      .attr('x', d => d.x - imageWidth / 2)
      .attr('y', d => d.y - imageWidth / 2);

    clip
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  function onEnterNode(d, i) {
    d3
      .select(this)
      .transition()
      .duration(200)
      .attr('width', imageWidth * 2)
      .attr('height', imageWidth * 2)
      .attr('transform', `translate(${-imageWidth / 2}, ${-imageWidth / 2})`);
    d3
      .select(clip.nodes()[i])
      .transition()
      .duration(200)
      .attr('r', imageRadius * 2)
      .attr('transform', `translate(${imageWidth / 2}, ${imageWidth / 2})`);
  }

  function onLeaveNode(d, i) {
    d3
      .select(this)
      .attr('width', imageWidth)
      .attr('height', imageWidth)
      .attr('transform', null);
      // .attr('transform', `translate(${imageWidth / 2}, ${imageWidth / 2})`);
    d3
      .select(clip.nodes()[i])
      .attr('r', imageRadius)
      .attr('transform', null);

    tick();
  }

  node.on('click', () => {
    console.log('click');
  });

  node
    .on('mouseenter', onEnterNode)
    .on('mouseleave', onLeaveNode);

  // OLD TOOLTIP STUFF
  // // Formats HTML for the node tooltips: show the book
  // // title and its average rating.
  // function nodeTooltipContent(d) {
  //   return `
  //     <strong>${d.name}</strong>
  //   `;
  // }

  // // Formats HTML for the link tooltips: show the two
  // // book titles and the tags they have in common.
  // function linkTooltipContent(d) {
  //   return `
  //     <strong>${d.source.name} &mdash; ${d.target.name}</strong>
  //     <p>${d.vote} people voted on this relationship</p>
  //   `;
  // }

  // function addToolTip(svg, selection, formatter) {
  //   const tip = d3.tip()
  //     .attr('class', 'tooltip')
  //     .html(formatter);
  //   svg.call(tip);
  //   selection
  //     .on('mouseenter', tip.show)
  //     .on('mouseleave', tip.hide);
  // }

  // // Initialize the tooltips
  // addToolTip(svg, node, nodeTooltipContent);
  // addToolTip(svg, link, linkTooltipContent);
}
