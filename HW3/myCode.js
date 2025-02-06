var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })

    var parkIcon = L.icon({    // notice the L.icon which is a Leaflet object with properties
        iconUrl: './parkSymbol.png',   
          // this points to a jpg image obtained from the internet
        iconSize: [25,25], // size of the icon
        popupAnchor: [0,0] // where the icon is located relative to the lat lon of the point. 
        });

var longitudePark0 = chparks.features[0].geometry.coordinates[0]
var latitudePark0 = chparks.features[0].geometry.coordinates[1]
// var marker = L.marker([latitudePark0,longitudePark0]).bindPopup("<b>My first park</b>").addTo(map);


var myParks = L.geoJSON(chparks, {
    pointToLayer: function (feature, latlng) {
       // console.log(latlng)
        return L.marker(latlng, {icon:parkIcon}).bindPopup(feature.properties.Park_Name);
    }
}).addTo(map);

myFeatures = chparks.features.map(e => e)

var baseLayers = {
    "OpenStreetMap": OSM,
    "ESRI": Esri_WorldImagery
    };

var overlayMaps = {
     "Chapel Hill Parks": myParks

    };

var layerControl = L.control.layers(baseLayers,overlayMaps).addTo(map);
