google.maps.visualRefresh = true;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var saigon = new google.maps.LatLng(10.775083376600016, 106.70212596036379);
  var mapOptions = {
    zoom: 18,
    center: saigon,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}


google.maps.event.addDomListener(window, 'load', initialize);
