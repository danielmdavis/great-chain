import * as d3 from 'd3';

/*
  Some of the code inspired/borrowed from http://bl.ocks.org/mbostock/1153292
*/

// For images
function addExtraData(d) {
  const data = {
    'Plato': {
      url: 'http://images.greece.com/info/Plato.jpg',
      lifespan: '428 - 348 BC',
      books: ['Apology'],
    },
    'Immanuel Kant': {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5s-1pZmB3JjKUr3k78SrbNlAks1A8NuuQeYidgeoA48s-UVdX',
      lifespan: '1724 - 1804',
      books: ['Critique of Pure Reason'],
    },
    'Edmund Husserl': {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6vqamj0KOapqXL7UGT9ZWM1fiUY4hQYUJYkvPDhLPJrcotxi',
      lifespan: '1859 - 1938',
      books: ['Cartesian Meditations'],
    },
    'Martin Heidegger': {
      url: 'http://144ood1pir281165p42ayw0t.wpengine.netdna-cdn.com/heidegger/files/2012/12/Heidegger_1955.jpg',
      lifespan: '1889 - 1976',
      books: ['Being and Time'],
    },
    'Emmanuel Levinas': {
      url: 'http://3.bp.blogspot.com/-2L6TqWiGyxQ/UCzYDCSdOZI/AAAAAAAAAVo/I1rf05Hb4gk/s1600/Emmanuel+Levinas.jpg',
      lifespan: '1906 - 1995',
      books: ['Totality and Infinity'],
    },
    'Simone de Beauvoir': {
      url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE4MDAzNDEwNDk3MjA5ODcw/simone-de-beauvoir-9269063-1-402.jpg',
      lifespan: '1908 - 1986',
      books: ['The Second Sex'],
    }
  }[d.name] || {
    // Dummy data if missing from hardcoded mapping
    url: 'https://media.istockphoto.com/vectors/cartoon-greek-philosopher-vector-id501134113',
    lifespan: 'Born - Died',
    books: ['No known books'],
  };

  d.img = data.url;
  d.lifespan = data.lifespan;
  d.books = data.books;
}


const imageWidth = 20;
const imageRadius = imageWidth / 2;

// note: this value might need to be scaled to the number
// of nodes in the network.
const STRENGTH = -1000;

// Controls length of animation
const DURATION = 200;

const forceWidth = 1400;
const forceHeight = 500;
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

    addExtraData(teacher);
    addExtraData(student);

    if (!uniqueNodes.has(d.teacher.id)) {
      nodes.push(d.teacher);
      uniqueNodes.add(d.teacher.id);
    }
    if (!uniqueNodes.has(d.student.id)) {
      nodes.push(d.student);
      uniqueNodes.add(d.student.id);
    }
    edges.push({
      id: d.id,
      source: d.teacher.id,
      target: d.student.id,
      vote: parseInt(Math.random() * 20),
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
    .append('image')
    .attr('class', 'node')
    .attr('id', d => `node-${d.id}`)
    .attr('xlink:href', d => d.img)
    .attr('width', imageWidth)
    .attr('height', imageWidth);

  // Add text elements for the philosopher names.
  const name = svg.append('g')
    .attr('class', 'names')
    .selectAll('.name')
    .data(data.nodes)
    .enter()
    .append('text')
    .attr('class', 'name')
    .attr('id', d => `name-${d.id}`)
    .attr('x', 13)
    .attr('y', '.31em')
    .text(d => d.name);

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

    name
      .attr('transform', d => `translate(${d.x}, ${d.y})`);
  }

  function reset() {
    d3.selectAll('.node').attr('opacity', 1);
    d3.selectAll('.link').attr('opacity', 1);
    d3.selectAll('.name').attr('opacity', 1);
  }

  function onEnterNode(d) {
    // Grow the image and slightly displace the text to accommodate
    // for the larger image on hover.
    d3
      .select(`#node-${d.id}`)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('width', imageWidth * 2)
      .attr('height', imageWidth * 2)
      .attr('transform', `translate(${-imageWidth / 2}, ${-imageWidth / 2})`);

    d3
      .select(`#name-${d.id}`)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('x', 23);
  }

  function onLeaveNode(d) {
    if (d.expanded) {
      return;
    }

    // Return image and text to their normal size/position.
    d3
      .select(`#node-${d.id}`)
      .attr('width', imageWidth)
      .attr('height', imageWidth)
      .attr('transform', null);

    d3.select(`#name-${d.id}`).attr('x', 13);

    tick();
  }

  function highlightNode(d) {
    d3.select(`#node-${d.id}`).attr('opacity', 1);
    d3.select(`#name-${d.id}`).attr('opacity', 1);
  }

  function onClickNode(d, i) {
    d3.select('.info-box').remove();

    if (d.expanded) {
      d.expanded = false;
      onLeaveNode(d);
      reset();
      return;
    }

    highlightNode(d);

    d3.select(`#name-${d.id}`).attr('opacity', 0);

    data.nodes.forEach(n => {
      n.expanded = n.id === d.id;
    });
    d3
      .selectAll('.node')
      .filter(n => n.id !== d.id)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('opacity', 0.4)
      .attr('width', imageWidth)
      .attr('height', imageWidth)
      .attr('transform', null);
    d3
      .selectAll('.name')
      .filter(n => n && n.id !== d.id)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('opacity', 0.1)
      .attr('x', 13);
    d3
      .selectAll('.link')
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('opacity', 0.1);

    // Add the info box
    const boxWidth = 250;
    const boxHeight = 80;

    const box = svg
      .append('g')
      .attr('class', 'info-box')
      .attr('transform', `translate(${d.x}, ${d.y - boxHeight / 2})`);
    box
      .append('rect')
      .attr('width', boxWidth)
      .attr('height', boxHeight);
    box
      .append('text')
      .attr('class', 'box-name')
      .attr('y', 25)
      .attr('x', 10)
      .text(d.name);
    box
      .append('text')
      .attr('class', 'box-lifespan')
      .attr('y', 45)
      .attr('x', 10)
      .text(d.lifespan);
    box
      .append('text')
      .attr('class', 'box-books')
      .attr('y', 65)
      .attr('x', 10)
      .text(d.books.join(', '));
    box
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('transform', `translate(${d.x + 25}, ${d.y - boxHeight / 2})`);
  }

  function onEnterLink(d) {
    onEnterNode(d.source);
    onEnterNode(d.target);
  }

  function onLeaveLink(d) {
    if (d.expanded) {
      return;
    }
    onLeaveNode(d.source);
    onLeaveNode(d.target);
  }

  function onClickLink(d) {
    d3.select('.info-box').remove();

    if (d.expanded) {
      d.expanded = false;
      onLeaveLink(d);
      reset();
      return;
    }

    highlightNode(d.source);
    highlightNode(d.target);

    data.edges.forEach(n => {
      n.expanded = n.index === d.index;
    });
    d3
      .selectAll('.node')
      .filter(n => n.id !== d.source.id && n.id !== d.target.id)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('opacity', 0.4)
      .attr('width', imageWidth)
      .attr('height', imageWidth)
      .attr('transform', null);
    d3
      .selectAll('.name')
      .filter(n => n && n.id !== d.source.id && n.id !== d.target.id)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('opacity', 0.1)
      .attr('x', 13);
    d3
      .selectAll('.link')
      .filter(l => l && l.index !== d.index)
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('opacity', 0.1);

    // Add the info box
    const boxWidth = 500;
    const boxHeight = 30;

    const x = (d.source.x + d.target.x) / 2;
    const y = (d.source.y + d.target.y) / 2;

    const box = svg
      .append('g')
      .attr('class', 'info-box')
      .attr('transform', `translate(${x}, ${y - boxHeight / 2})`);
    box
      .append('rect')
      .attr('width', boxWidth)
      .attr('height', boxHeight);
    box
      .append('text')
      .attr('class', 'box-votes')
      .attr('y', 20)
      .attr('x', 10)
      .html(`<tspan class="heart">&hearts;</tspan> <tspan class="vote-text">${d.vote} people agree with this relationship.</tspan> <tspan class="vote-link">What do you think?</tspan>`)
      .on('click', () => {
        console.log(d);
        console.log('PLACEHOLDER -- REDIRECT TO VOTE PAGE');
      });
    box
      .interrupt()
      .transition()
      .duration(DURATION)
      .attr('transform', `translate(${x + 25}, ${y - boxHeight / 2})`);
  }

  node
    .on('mouseenter', onEnterNode)
    .on('mouseleave', onLeaveNode)
    .on('click', onClickNode);

  link
    .on('mouseenter', onEnterLink)
    .on('mouseleave', onLeaveLink)
    .on('click', onClickLink);
}
