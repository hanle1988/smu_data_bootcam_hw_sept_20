//Step 1: Get the GeoJSON data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Step 2: Create the base layers
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
  
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
  


//Step3: start creating markers
  

//use d3 to query data
d3.json(url).then(function(data) {
    //the color of the marker based on depth
    function Color(depth) {
        if (depth <= 10) return "#00CC00";
        else if (depth <= 30) return "#00CCCC";
        else if (depth <= 50) return "#FFFF33";
        else if (depth <= 70) return "#FF8000";
        else if (depth <= 90) return "#FF6666";
        else return "#660000";
        
    }
      
    // get the size of marker
    function Size(magnitude) {
        // if magnitude is 0, add marker. Other, multiple by 30000 the size of marker
        if (magnitude === 0) {
          return 1;
        }
        return magnitude * 30000;
    }

  //start creating markers
  for (let i = 0; i < data.features.length; i++) {
    let feature = data.features[i]
    // console.log(feature);

    L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
        fillOpacity: 2,
        color: "black",
        fillColor: Color(feature.geometry.coordinates[2]),
        radius: Size(feature.properties.mag),
        stoke: true,
        weight: 2
    }).bindPopup(`<h2>Where: ${feature.properties.place}</h2><h3>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}</h3>`).addTo(myMap);
}

});

// Step 4: Create layer control objects and Start the map
    // Base Map
    let baseMaps = {
        Street: street,
        Topography: topo
    };

    //Overlays map - can be toggled on or off
    //let circleLayer = L.layerGroup(circles)

    //let geoLayer = L.geoJSON(geoData);
    
    
    //let overlayMaps = {
    //Markers: circleLayer,
    //"Tectonic Plates": geoLayer
    //};

    // start the map
    let myMap = L.map("map", {
    center: [37.0923, -95.7181],
    zoom: 5,
    layers:street
    });


// Step 5: 
    // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps).addTo(myMap);
   
// Step 6 add the legend
    // Create a legend control object
    let legend = L.control({position: "bottomright"});

    // Then add all the details for the legend
    legend.onAdd= function(map){
        let div = L.DomUtil.create('div', 'info legend');
        let limits = ['< 10', '10-30','30-50','50-70','70-90','90+'];
        let colors=['#00CC00"',"#00CCCC","#FFFF33","#ff8000", '#ff6666','#660000'];
        
        for (let i=0; i<limits.length; i++) {
            div.innerHTML+= `<p style="background-color:${colors[i]}" > ${limits[i]} </p>`
            
        }
        return div
    };

    // Finally, we our legend to the map.
    legend.addTo(myMap)







