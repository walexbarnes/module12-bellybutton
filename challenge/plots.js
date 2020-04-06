
//Populate the options in the dropdown
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

//On Load, 
window.onload = function() {
  //table div
  d3.json("samples.json").then((data) => {
    var result = data.metadata[0];
    console.log(result)
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    //ID: ETHNICITY: GENDER AGE LOCATION BBTYPE WFREQ
    PANEL.append("h6").text('ID: '+result.id);
    PANEL.append("h6").text('Ethnicity: '+result.ethnicity);
    PANEL.append("h6").text('Gender: '+result.gender);
    PANEL.append("h6").text('Age: '+result.age);
    PANEL.append("h6").text('Location: '+result.location);
    PANEL.append("h6").text('Type: '+result.bbtype);
    PANEL.append("h6").text('W. Freq.: '+result.wfreq);
    


  });
//array for bar 


sample_values = []
otu_ids = []
otu_labels = []
  d3.json("samples.json").then(function(data){

     for (i=0;i<10;i++)
     {
       sample_values.push(data.samples[0].sample_values[i])
       otu_ids.push('OTU: '+data.samples[0].otu_ids[i])
       otu_labels.push(data.samples[0].otu_labels[i])
 
     }
    
//On load, display default bar
function defaultBar() {
  var data = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      labels:otu_labels,
      type: 'bar'
    }
  ];
  Plotly.newPlot('bar', data);
};

defaultBar()

//bubble


bsample_values = []
botu_ids = []
botu_labels = []

for (i=0;i<data.samples[0].sample_values.length;i++)
{
  bsample_values.push(data.samples[0].sample_values[i])
  botu_ids.push(data.samples[0].otu_ids[i])
  botu_labels.push(data.samples[0].otu_labels[i])

}

var trace1 = {
  x: botu_ids,
  y: bsample_values,
  mode: 'markers',
  marker: {
    size: bsample_values,
    color:otu_ids
  }
};

var data = [trace1];

var layout = {
  title: 'Marker Size',
  showlegend: false,
  height: 600,
  width: 600
};

Plotly.newPlot('bubble', data, layout);

});

}





//on change, display new data
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

//on change, display new table
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(resultArray)
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    //ID: ETHNICITY: GENDER AGE LOCATION BBTYPE WFREQ
    PANEL.append("h6").text('ID: '+result.id);
    PANEL.append("h6").text('Ethnicity: '+result.ethnicity);
    PANEL.append("h6").text('Gender: '+result.gender);
    PANEL.append("h6").text('Age: '+result.age);
    PANEL.append("h6").text('Location: '+result.location);
    PANEL.append("h6").text('Type: '+result.bbtype);
    PANEL.append("h6").text('W. Freq.: '+result.wfreq);


  });
}

//onchange, display new chart
function buildCharts(sample) 
  {
    sample_values = []
    otu_ids = []
    otu_labels = []
  
    d3.json("samples.json").then((data) => {
      var metadata = data.samples;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log('here we go')
    console.log(resultArray)

    for (i=0;i<10;i++)
    {
      sample_values.push(resultArray[0].sample_values[i])
      otu_ids.push('OTU: '+resultArray[0].otu_ids[i])
      otu_labels.push(resultArray[0].otu_labels[i])

    }

  

    function defaultBarz() {

      var trace = {
        x:otu_ids,
        y:sample_values,
        text: otu_labels,
        labels:otu_labels,
        type: 'bar'

      };
      Plotly.newPlot("bar", [trace]);
        };
    
        defaultBarz()
//update the bubble bullsh*t
        bsample_values = []
        botu_ids = []
        botu_labels = []
        
        for (i=0;i<resultArray[0].otu_ids.length;i++)
        {
          bsample_values.push(resultArray[0].sample_values[i])
          botu_ids.push('OTU: '+resultArray[0].otu_ids[i])
          botu_labels.push(resultArray[0].otu_labels[i])
        
        }
        console.log(botu_ids)
        console.log(bsample_values)
        console.log(botu_labels)
        
        var trace1 = {
          x: botu_ids,
          y: bsample_values,
          mode: 'markers',
          marker: {
            size: bsample_values,
            color:otu_ids
          }
        };
        
        var data = [trace1];
        
        var layout = {
          title: 'Marker Size',
          showlegend: false,
          height: 600,
          width: 600
        };

  Plotly.newPlot('bubble', data, layout);

  })



}
