// Encapsulate the word cloud functionality
function wordCloud(selector) {

  var fill = d3.scale.category20();

  //Construct the word cloud's SVG element
  // var svg_w = d3.select("#word_cloud").append("svg")
  //     .attr("width", 500)
  //     .attr("height", 300)
  //     .append("g")
  //     .attr("transform", "translate(250,250)");
  var margin_w = {top: 10, right: 10, bottom: 10, left: 100},
    width = 500 - margin_w.left - margin_w.right,
    height = 300 - margin_w.top - margin_w.bottom;
      var svg_w = d3.select("#word_cloud").append("svg")
          .attr("width", width + margin_w.left + margin_w.right)
          .attr("height", height + margin_w.top + margin_w.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin_w.left + "," + margin_w.top + ")");

  //Draw the word cloud
  function draw(words) {
      var cloud = svg_w.selectAll("g text")
                      .data(words, function(d) { return d.text; })

      //Entering words
      cloud.enter()
          .append("text")
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr('font-size', 1)
          .text(function(d) { return d.text; });

      //Entering and existing words
      cloud
          .transition()
              .duration(600)
              .style("font-size", function(d) { return d.size + "px"; })
              .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .style("fill-opacity", 1);

      //Exiting words
      cloud.exit()
          .transition()
              .duration(200)
              .style('fill-opacity', 1e-6)
              .attr('font-size', 1)
              .remove();
  }


  //Use the module pattern to encapsulate the visualisation code. We'll
  // expose only the parts that need to be public.
  return {

      //Recompute the word cloud for a new set of words. This method will
      // asycnhronously call draw when the layout has been computed.
      //The outside world will need to call this function, so make it part
      // of the wordCloud return value.
      update: function(words) {
          d3.layout.cloud().size([500, 300])
              .words(words)
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 45; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw)
              .start();
      }
  }

}

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines
var words = [
  "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
  "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
  "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
  "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
]

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
  return words[i]
          .replace(/[!\.,:;\?]/g, '')
          .split(' ')
          .map(function(d) {
              return {text: d, size: 10 + Math.random() * 60};
          })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
  i = i || 0;

  vis.update(getWords(i ++ % words.length))
  setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('body');

//Start cycling through the demo data
//showNewWords(myWordCloud);

/////HeatMap
////////////////////////////////////////////////////////////
var margin = {top: 0, right: 30, bottom: 30, left: 50},
  width = 400 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct"]
var myVars = ["Prod1", "Prod2", "Prod3", "Prod4", "Prod5", "Prod6", "Prod7", "Prod8", "Prod9", "Prod10"]

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups)
  .padding(0.01);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  //.attr("transform", "translate(-10,10)rotate(-45)")
  .style("text-anchor", "end")
  .style("font-size", 10)
  .style("fill", "white")
  

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y))
  .selectAll("text")
  //.attr("transform", "translate(-10,10)rotate(-45)")
  .style("text-anchor", "end")
  .style("font-size", 10)
  .style("fill", "white");

scaleColors = ["#C80000", "#EB3443", "#F85353", "#FF5A80", "#EF7B96", "#B1B1B1", "#8CD087", "#7CE974", "#62EC59", "#42F735", "#4AF43E"];
//scaleColors.reverse();
var myColor=d3.scaleLinear().domain([-1, -0.8, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1]).range(scaleColors);
// Build color scale
//var myColor = d3.scaleLinear()
  //.range(["white", "#69b3a2"])
  //.domain([1,100])

//Read the data
d3.csv("https://raw.githubusercontent.com/Menaka811/DV_FinalProject/master/Heatmap.csv", function(data) {

  // create a tooltip
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  // var mouseover = function(d) {
  //   tooltip.style("opacity", 1)
  // }
  // var mousemove = function(d) {
  //   tooltip
  //     .html("The sentiment: " + d.sentiment)
  //     .style("left", (d3.mouse(this)[0]+70) + "px")
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }
  // var mouseleave = function(d) {
  //   tooltip.style("opacity", 0)
  // }
  var i=0
   var mouseclick= function(d){
    showNewWords(myWordCloud);
   }
   var mousemove = function(d){
    //layout.exit();
   }
   var mouseleave= function(d){
    //layout.exit();

   }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.sentimentval)} )
    //.on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .on("click",mouseclick)
})
