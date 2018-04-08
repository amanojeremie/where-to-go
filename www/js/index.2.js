
var map;
var markers = [];
var path;

function initMap() {
	console.log("test");
	map = new google.maps.Map(document.getElementById("map"), {center: {lat: 0, lng: 0}, zoom: 4});
}

function addMarker(position, label) {
	var marker = new google.maps.Marker({position: position, label: label, map: map});
	markers.push(marker);
}

function clearMarkers() {
	for(var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}