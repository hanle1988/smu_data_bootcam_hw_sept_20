//Use D3 library to read the samples.json (with the provided url)
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"; 
let data= {};



//Read the data
    d3.json(url).then(function (data1) {
        console.log(data1);
        data=data1; // save to global variable
        dropdown(); //make dropdown function
        bar("940"); //make bar - top 10 OTU
        demographic("940");
        bubble("940");
        guage("940");
    });
    
    //dropdown 
    function dropdown() {
        //loop through samples
        for (let i = 0; i < data.names.length; i++){
          let name = data.names[i];
          d3.select("#selDataset").append("option").text(name).property('value', name);
        }
    }
    
    function optionChanged(val){
        bar(val);
        demographic(val);
        bubble(val);
        guage(val);
    }


    //bar chart for the top 10 OTU
    function bar(val){
        let bar_graph= data.samples.filter(x => x.id === val)[0]
        // Trace for OTU data
        var trace1 = {
            x: bar_graph.sample_values.slice(0, 10).reverse(),
            y: bar_graph.otu_ids.slice(0, 10).reverse().map(otu_id => `OTU ${otu_id}`),
            name: 'Top 10 OTU"',
            type: 'bar',
            orientation: "h",
            hovertext: bar_graph.otu_labels
            };
        // Data trace array
        let traces = [trace1];
        // Apply the group barmode to the layout
        let layout = {
            title: "Top 10 OTU"   
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", traces, layout);
    };
      
   
   //function to fill in demographic box
    function demographic(val){
            
            //filter the meta data
            let metadata_info =  data.metadata.filter(x => x.id == val)[0];
            console.log(metadata_info);

            //select the demographic box
            let demographic_box = d3.select('#sample-metadata');
            demographic_box.html('');
            Object.entries(metadata_info).forEach(function(key, val) {
            demographic_box.append('h6').text(`${key}: ${val}`)
            });
        
    };

//bubble chart 
  function bubble(val){
    let bubble_graph= data.samples.filter(x => x.id === val)[0];
    // Trace for OTU data
    var trace2 = {
        x: bubble_graph.otu_ids,
        y: bubble_graph.sample_values,
        name: 'Bacteria',
        mode: 'markers',
        marker: {
            color: bubble_graph.otu_ids,
            size: bubble_graph.sample_values
            },
        hovertext: bubble_graph.otu_labels
    };
    // Data trace array
        let traces2 = [trace2];
    // Apply the group barmode to the layout
        let layout = {
            title: "Bubbles",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Sample Values'},   
        };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", traces2, layout);
};      


//guage chart
    
function guage (val) {
    let gauge_graph = [{
        domain: {x: [0,1], y: [0,1]},
        value: data.wfreq,
        title: {text: 'Belly Button Washing Frequency (Scrubs per Week)'},
        type: 'indicator',
        mode: 'gauge+number+delta',
        gauge: {
            axis: {range: [0,9]},
            steps: [
                { range: [0, 1], color: "PapayaWhip  "},
                { range: [1, 2], color: "Moccasin " },
                { range: [2, 3], color: "oldlace" },
                { range: [3, 4], color: "PeachPuff" },
                { range: [4, 5], color: "orange" },
                { range: [5, 6], color: "darkorange" },
                { range: [6, 7], color: "coral" },
                { range: [7, 8], color: "tomato" },
                { range: [8, 9], color: "orangered" }]
        }
    }];

    let gauge_layout = { width: 600, height: 500};

    Plotly.newPlot('gauge',gauge_graph, gauge_layout);

};