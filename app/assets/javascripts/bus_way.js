google.maps.visualRefresh = true;
function initialize() {
  var saigon = new google.maps.LatLng(10.775083376600016, 106.70212596036379);
  var mapOptions = {
    zoom: 18,
    center: saigon,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

