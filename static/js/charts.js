function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("static/json/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("static/json/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the static/json/samples.json file 
  d3.json("static/json/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples
    var wfreq = data.metadata.filter(sampleObj => sampleObj.id == sample)[0].wfreq;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids
    var otu_labels = result.otu_labels
    var sample_values = result.sample_values

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = sample_values.slice(0,10).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [
      trace = {
        y: otu_ids.slice(0,10).map(id => "OTU " + id).reverse(),
        x: yticks,
        textfont: {
          color: "#ff0000"
        },
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title:
      {
        text : "Top 10 Bacteria Cultures Found",
        font : {
          size: 20,
          color : 'red'
        }
      } ,
      plot_bgcolor: "#f5f5f5",
      paper_bgcolor:"#f5f5f5",
      xaxis : {
        tickfont : {
          size: 16,
          color : 'red'
        }
      },
      yaxis : {
        tickfont : {
          size: 16,
          color : 'red'
        }
      },
      // margin: {
      //   l: 100,
      //   r: 100,
      //   t: 100,
      //   b: 100
      // }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // 11. Bubble Chart
    var bubbleData = [
      trace = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
          size: sample_values,
          colorscale: 'Earth',
          color: otu_ids
        },
        text: otu_labels,
        type: "scatter"
      },
    ];
  
    var bubbleLayout = {
      title:
      {
        text : "Bacteria Cultures Per Sample",
        font : {
          size: 20,
          color : 'red'
        }
      } ,
      plot_bgcolor: "#f5f5f5",
      paper_bgcolor:"#f5f5f5",
      xaxis : {
        tickfont : {
          size: 16,
          color : 'red'
        }
      },
      yaxis : {
        tickfont : {
          size: 16,
          color : 'red'
        }
      },
      // margin: {
      //   l: 100,
      //   r: 100,
      //   t: 100,
      //   b: 100
      // }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 12. Gauge Chart
    var gaugeData = [
      trace = {
        domain: { x: [0, 1], y: [0, 1] },
        mode: "gauge+number",
        title: { text: "Scrubs Per Week" },
        type: "indicator",
        value: wfreq,
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "darkseagreen" },
            { range: [8, 10], color: "green" }
          ],
      },
      }];
  
    var gaugeLayout = {
      title:
      {
        text : "Belly Button Washing Frequency",
        font : {
          size: 20,
          color : 'red'
        }
      } ,
      plot_bgcolor: "#f5f5f5",
      paper_bgcolor:"#f5f5f5",
      xaxis : {
        tickfont : {
          size: 16,
          color : 'red'
        }
      },
      yaxis : {
        tickfont : {
          size: 16,
          color : 'red'
        }
      },
      // margin: {
      //   l: 100,
      //   r: 100,
      //   t: 100,
      //   b: 100
      // }
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}
