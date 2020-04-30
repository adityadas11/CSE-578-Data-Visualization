
// var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10},{"text":"electricity","size":15},{"text":"movement","size":10},{"text":"relation","size":5},{"text":"things","size":10},{"text":"force","size":5},{"text":"ad","size":5},{"text":"energy","size":85},{"text":"living","size":5},{"text":"nonliving","size":5},{"text":"laws","size":15},{"text":"speed","size":45},{"text":"velocity","size":30},{"text":"define","size":5},{"text":"constraints","size":5},{"text":"universe","size":10},{"text":"physics","size":120},{"text":"describing","size":5},{"text":"matter","size":90},{"text":"physics-the","size":5}]



// // List of words
// var myWords = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate", "Peace", "Love", "Keep", "The", "Good", "Work", "Make", "Love", "Not", "War","Surfing","R", "R",
//    "Data-Viz","Python","Linux","Programming","Graph Gallery","Biologie", "Resistance",
//    "Computing","Data-Science","Reproductible","GitHub","Script", "Experimentation","Talk","Conference","Writing",
//    "Publication","Analysis","Bioinformatics","Science","Statistics","Data",
//    "Programming","Wheat","Virus","Genotyping","Work","Fun","Surfing","R", "R",
//    "Data-Viz","Python","Linux","Programming"]

// // set the dimensions and margins of the graph
// var margin_w = {top: 10, right: 10, bottom: 10, left: 100},
//     width = 500 - margin_w.left - margin_w.right,
//     height = 300 - margin_w.top - margin_w.bottom;
// // append the svg object to the body of the page
// var svg_w = d3.select("#word_cloud").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// // Wordcloud features that are different from one word to the other must be here
// var layout = d3.layout.cloud()
//   .size([width, height])
//   //.words(myWords.map(function(d) { return {text: d}; }))
//   .words(frequency_list)
//   .padding(5)        //space between words
//   .rotate(-45)       // rotation angle in degrees
//   //.fontSize(20)      // font size of words
//   .fontSize(function(d) { return d.size; })
//   .on("end", draw_words);
// layout.start();

// // This function takes the output of 'layout' above and draw the words
// // Wordcloud features that are THE SAME from one word to the other can be here
// function draw_words(words) {
//   svg_w
//     .append("g")
//       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//       .selectAll("text")
//         .data(words)
//         .enter().append("text")
//         .style("font-size", function(d) { return d.size + "px"; })
//         .style("fill", function(d, i) { return color(i); })
//         .attr("transform", function(d) {
//             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//         })
//         .text(function(d) { return d.text; });
// //       .enter().append("text")
// //         .style("font-size", 20)
// //         .style("fill", "#69b3a2")
// //         .attr("text-anchor", "middle")
// //         .style("font-family", "Impact")
// //         .attr("transform", function(d) {
// //           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
// //         })
// //         .text(function(d) { return d.text; });
//  }
