///Word cloud
var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10},{"text":"electricity","size":15},{"text":"movement","size":10},{"text":"relation","size":5},{"text":"things","size":10},{"text":"force","size":5},{"text":"ad","size":5},{"text":"energy","size":85},{"text":"living","size":5},{"text":"nonliving","size":5},{"text":"laws","size":15},{"text":"speed","size":45},{"text":"velocity","size":30},{"text":"define","size":5},{"text":"constraints","size":5},{"text":"universe","size":10},{"text":"physics","size":120},{"text":"describing","size":5},{"text":"matter","size":90},{"text":"physics-the","size":5}]
// List of words
var myWords = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate", "Peace", "Love", "Keep", "The", "Good", "Work", "Make", "Love", "Not", "War","Surfing","R", "R",
   "Data-Viz","Python","Linux","Programming","Graph Gallery","Biologie", "Resistance",
   "Computing","Data-Science","Reproductible","GitHub","Script", "Experimentation","Talk","Conference","Writing",
   "Publication","Analysis","Bioinformatics","Science","Statistics","Data",
   "Programming","Wheat","Virus","Genotyping","Work","Fun","Surfing","R", "R",
   "Data-Viz","Python","Linux","Programming"]

// set the dimensions and margins of the graph
var margin_w = {top: 10, right: 10, bottom: 10, left: 100},
    width = 450 - margin_w.left - margin_w.right,
    height = 300 - margin_w.top - margin_w.bottom;
// append the svg object to the body of the page
var svg_w = d3.select("#word_cloud").append("svg")
    .attr("width", width + margin_w.left + margin_w.right)
    .attr("height", height + margin_w.top + margin_w.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_w.left + "," + margin_w.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here

  //.words(myWords.map(function(d) { return {text: d}; }))

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
  var layout = d3.layout.cloud()
  .size([width, height])
function draw_words(words) {
  svg_w.html("");
  svg_w
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return (d.size*0.1) + "px"; })
        .style("fill", function(d, i) { return color(i); })
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

      }

///HeatMap
///////////////////////////////////////////////////////////////////
var margin = {top: 0, right: 30, bottom: 30, left: 150},
  width = 450 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov","Dec"]
var myVars = ["Electronics","Books","Sports_and_Outdoors","Home_and_Kitchen","Clothing_Shoes_and_Jewelry"]

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
d3.csv("https://raw.githubusercontent.com/Menaka811/DV_FinalProject/master/data.csv", function(data) {

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
   var wordclouddata=JSON.parse(wordcloud)
   console.log(wordclouddata)
   var mouseover= function(d){
     console.log(d.group);
     console.log(d.variable);
    layout.words(frequency_list)
    .padding(5)        //space between words
    .rotate(-45)       // rotation angle in degrees
    //.fontSize(20)      // font size of words
    .fontSize(function(d) { return d.size; })
    .on("end", draw_words);
  layout.start();
  
   }
   var mousemove = function(d){
  layout.stop()
   }
   var mouseleave= function(d){
  layout.stop()
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
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
  });
