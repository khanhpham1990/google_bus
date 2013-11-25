google.maps.visualRefresh = true;
var map;
function initialize() {
  var saigon = new google.maps.LatLng(10.775083376600016, 106.70212596036379);
  var mapOptions = {
    zoom: 17,
    center: saigon,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


  // Function autocomplete input start
  autoCompleteStart(map);

  // Function autocomplete input end
  autoCompleteEnd(map);

  var directionsRendererOptions = {};
  var directionsRenderer = new google.maps.DirectionsRenderer(directionsRendererOptions);
  var directionsService = new google.maps.DirectionsService();
  var contextMenuOptions = {};
  var menuItems = [];
  var markerOptions = {};
  directionsRendererOptions.draggable = false;
  directionsRendererOptions.hideRouteList = true;
  directionsRendererOptions.suppressMarkers = false;
  directionsRendererOptions.preserveViewport = false;
  //
  contextMenuOptions.classNames = {menu: 'context_menu', menuSeparator: 'context_menu_separator'};
  //
  menuItems.push({className: 'context_menu_item', eventName: 'directions_origin_click', id: 'directionsOriginItem', label: 'Directions from here'});
  menuItems.push({className: 'context_menu_item', eventName: 'directions_destination_click', id: 'directionsDestinationItem', label: 'Directions to here'});
  menuItems.push({className: 'context_menu_item', eventName: 'clear_directions_click', id: 'clearDirectionsItem', label: 'Clear directions'});
  menuItems.push({className: 'context_menu_item', eventName: 'get_directions_click', id: 'getDirectionsItem', label: 'Get directions'});
  //
  menuItems.push({});
  menuItems.push({className: 'context_menu_item', eventName: 'zoom_in_click', label: 'Thu nhỏ'});
  menuItems.push({className: 'context_menu_item', eventName: 'zoom_out_click', label: 'Phóng to'});
  menuItems.push({});
  menuItems.push({className: 'context_menu_item', eventName: 'center_map_click', label: 'Trung tâm bản đồ'});
  contextMenuOptions.menuItems = menuItems;

  var contextMenu = new ContextMenu(map, contextMenuOptions);
  //
  google.maps.event.addListener(map, "rightclick", function(mouseEvent){
    contextMenu.show(mouseEvent.latLng);
  });
  //
  markerOptions.icon = 'assets/start_end/start.png';
  markerOptions.map = null;
  markerOptions.position = new google.maps.LatLng(0, 0);
  markerOptions.title = 'Điểm bắt đầu';
  var originMarker = new google.maps.Marker(markerOptions);
  //
  markerOptions.icon = 'assets/start_end/exit_1.png';
  markerOptions.title = 'Điểm kết thúc';
  var destinationMarker = new google.maps.Marker(markerOptions);
  //
  //
  google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
    switch(eventName){
      case 'directions_origin_click':
        getStationNearestWithPositionStart(latLng);             // call function return coordinate nearest with position lat long start
        originMarker.setPosition(latLng);
      if(!originMarker.getMap()){
        originMarker.setMap(map);
      }
      break;
      case 'directions_destination_click':
        destinationMarker.setPosition(latLng);
        getStationNearestWithPositionEnd(latLng);              // call function return coordinate nearest with position lat long end
      if(!destinationMarker.getMap()){
        destinationMarker.setMap(map);
      }
      break;
      case 'clear_directions_click':
        directionsRenderer.setMap(null);
      document.getElementById('clearDirectionsItem').style.display = '';
      document.getElementById('directionsDestinationItem').style.display = '';
      document.getElementById('directionsOriginItem').style.display = '';
      document.getElementById('getDirectionsItem').style.display = '';
      break;
      case 'get_directions_click':
        var directionsRequest = {};
      directionsRequest.destination = destinationMarker.getPosition();
      directionsRequest.origin = originMarker.getPosition();
      directionsRequest.travelMode = google.maps.TravelMode.DRIVING;

      directionsService.route(directionsRequest, function(result, status) {
        if(status === google.maps.DirectionsStatus.OK) {
          originMarker.setMap(null);
          destinationMarker.setMap(null);
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(map);
          document.getElementById('clearDirectionsItem').style.display = 'block';
          document.getElementById('directionsDestinationItem').style.display = 'none';
          document.getElementById('directionsOriginItem').style.display = 'none';
          document.getElementById('getDirectionsItem').style.display = 'none';
        } else {
          alert('Sorry, the map was unable to obtain directions.\n\nThe request failed with the message: ' + status);
        }
      });
      break;
      case 'zoom_in_click':
        map.setZoom(map.getZoom() + 1);
      break;
      case 'zoom_out_click':
        map.setZoom(map.getZoom() - 1);
      break;
      case 'center_map_click':
        map.panTo(latLng);
      break;
    }
    if(originMarker.getMap() && destinationMarker.getMap() && document.getElementById('getDirectionsItem').style.display==='') {
      document.getElementById('getDirectionsItem').style.display = 'block';
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);


// Function get coordinate station nearest with position start
function getStationNearestWithPositionStart(latLng) {
  var distance = 100;
  $.get("/getStationNearest", {latitude: latLng.lat(), longtitude: latLng.lng(), distance: distance}, function(data, status) {
    console.log(data);
  });
}


// Function get coordinate station nearest with position end
function getStationNearestWithPositionEnd(latLng) {
  var distance = 100;
  $.get("/getStationNearest", {latitude: latLng.lat(), longtitude: latLng.lng(), distance: distance}, function(data, status) {
  });
}

function autoCompleteStart(map) {
  var input = document.getElementById('start_input');
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  call_autocomplete(marker, infowindow, autocomplete);
}

function autoCompleteEnd(map) {
  var input = document.getElementById("end_input");
  var autocomplete = new  google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  call_autocomplete(marker, infowindow, autocomplete);
}

function call_autocomplete(marker, infowindow, autocomplete) {
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    console.log(place);
    if (!place.geometry) {
      return;
    }
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
      console.log(place.geometry.location.ob + "-" + place.geometry.location.pb);
    }
    //
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
}
