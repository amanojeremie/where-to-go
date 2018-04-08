
var map;
var markers = [];
var path;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {center: {lat: 40.184202, lng: -92.583580}, zoom: 17});
	$.getJSON('http://some-dood.truman.edu:8000/toilet', function(toilets) {
		console.log(toilets);
		for(toilet in toilets) {
			addMarker(toilets[toilet], toilets[toilet].name, function() {
				window.history.pushState(null, null, '?id=' + toilet);
				navigate('view.html');
			})
		}
	});
	google.maps.event.trigger(map, 'resize');
}

function addMarker(position, label, onClick) {
	console.log(position);
	var marker = new google.maps.Marker({position: position, label: label, map: map});
	marker.addListener('click', onClick);
	markers.push(marker);
}

function newToilet() {
	window.history.pushState(null, null, '?lat=' + map.getCenter().lat() + '&lng=' + map.getCenter().lng());
	navigate('new.html?lat=' + map.getCenter().lat() + '&lng=' + map.getCenter().lng());
}

function clearMarkers() {
	for(var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}