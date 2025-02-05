var carolinaHall = [35.911276,-79.0500]

// var marker = L.marker(carolinaHall).bindPopup("<b>Carolina Hall</b>").addTo(map);
var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#7BAFD4",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var carolinaHallMarker= L.circleMarker(carolinaHall,geojsonMarkerOptions).addTo(map);

var longitudeWpt0 = waypoints.features[0].geometry.coordinates[0]
var latitudeWpt0 = waypoints.features[0].geometry.coordinates[1]
var marker = L.marker([latitudeWpt0,longitudeWpt0]).bindPopup("<b>My first waypoint</b>").addTo(map);

var myCircles = L.geoJSON(waypoints, {
    pointToLayer: function (feature, latlng) {
       // console.log(latlng)
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.note );
    }
}).addTo(map);

myFeatures = waypoints.features.map(e => e)

var baseLayers = {
    "OpenStreetMap": OSM,
    "ESRI": Esri_WorldImagery
    };

    var overlayMaps = {
        "My Vector": myCircles,
        'My first waypoint': marker,
        'Carolina Hall': carolinaHallMarker
    };

var layerControl = L.control.layers(baseLayers,overlayMaps).addTo(map);
