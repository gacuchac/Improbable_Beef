// function init() {
//   data = [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] }];
//   Plotly.newPlot("plot", data);
// };

// d3.selectAll("#dropdownMenu").on("change", updatePlotly);
// function updatePlotly() {
//   var dropdownMenu = d3.select("#dropdownMenu");
//   var dataset = dropdownMenu.property("value");

//   var xData = [1, 2, 3, 4, 5];
//   var yData = [];

//   if (dataset === 'dataset1') {
//     yData = [1, 2, 4, 8, 16];
//   };

//   if (dataset === 'dataset2') {
//     yData = [1, 10, 100, 1000, 10000];
//   };

//   var trace = {
//     x: [xData],
//     y: [yData],
//   };
//   Plotly.restyle("plot", trace);
// };

// init();

// var trace = {
//     x: ["burrito", "pizza", "chicken"],
//     y: [10, 18, 5],
//     type: "bar"
// };

// var layout = {
//     title: "Luncheon Survey",
//     xaxis: {title: "Food Option"},
//     yaxis: {title: "Number of Respondents"}
// };

// Plotly.newPlot("plotArea", [trace], layout);

// var trace = {
//     labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
//     "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//     values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: 'pie'
//    };
//    var data = [trace];
//    var layout = {
//     title: "'Bar' Chart",
//    };
//    Plotly.newPlot("plotArea", data, layout);
// console.log(cityGrowths);

// var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
// var topFiveCities = sortedCities.slice(0,5);
// var topFiveCityNames = topFiveCities.map(city => city.City);
// var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));

// var trace = {
//     x: topFiveCityNames,
//     y: topFiveCityGrowths,
//     type: "bar"
//   };
//   var data = [trace];
//   var layout = {
//     title: "Most Rapidly Growing Cities",
//     xaxis: { title: "City" },
//     yaxis: { title: "Population Growth, 2016-2017"}
//   };
//   Plotly.newPlot("bar-plot", data, layout);

//   ///////////////////////////////////////////////////////////////////////////////
// var sortedCities = cityGrowths.sort((a,b) => a.population - b.population).reverse();
// var topFiveCities = sortedCities.slice(0,5);
// var topFiveCityNames = topFiveCities.map(city => city.City);
// var topFiveCityPopulation = topFiveCities.map(city => parseInt(city.population));

// var trace = {
//     x: topFiveCityNames,
//     y: topFiveCityPopulation,
//     type: "bar"
//   };
//   var data = [trace];
//   var layout = {
//     title: "Most Populated Cities",
//     xaxis: { title: "City" },
//     yaxis: { title: "Population"}
//   };
//   Plotly.newPlot("bar-plot2", data, layout);

function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
    PANEL.append("h6").text("GENDER: " + result.gender);
    PANEL.append("h6").text("AGE: " + result.age);
    PANEL.append("h6").text("LOCATION: " + result.location);
    PANEL.append("h6").text("BBTYPE: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);

  });
}