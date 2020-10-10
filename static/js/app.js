function buildMetadata(sample) {
d3.json("data/samples.json").then((data) => {
  console.log(data);
//demo info//
   var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
//Gauge//
function buildGauge(sample) {
d3.json("data/samples.json").then((data) => {
  console.log(data);
  var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    Object.entries(result).forEach(([key, value]) => {
      if (key =="wfreq") {
        var wfreq = value
      }
    }); 
var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: 0,
    title: { text: "wfreq", font: { size: 24 } },
    delta: { reference: 9, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 5], color: "cyan" },
        { range: [5, 9], color: "royalblue" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 9
      }
    }
  }
];

var layout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('gauge', data, layout);


 });
}

function buildCharts(sample) {
d3.json("data/samples.json").then((data) => {
  console.log(data);
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var data = resultArray[0];

    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;
    var sample_values = data.sample_values;

    // Bubble chart
    var bubbleLayout = {
      title: "Belly button bacteria bubble chart",
      margin: { t: 10},
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 50}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
//bar chart//
   var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "belly button bacteria bar chart",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function init() {
  //dropdown menu//
  var selector = d3.select("#selDataset");

d3.json("data/samples.json").then((data) => {
  console.log(data);
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var SecondSample = sampleNames[1];
    buildCharts(SecondSample);
    buildMetadata(SecondSample);
    buildGauge(SecondSample);
  });
}
//final solution//

function optionChanged(FinalSample) {
  buildCharts(FinalSample);
  buildMetadata(FinalSample);
  buildGauge(FinalSample);
}

init();
