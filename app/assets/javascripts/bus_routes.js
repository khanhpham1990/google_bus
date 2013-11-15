function drawPathGoogleRoutes(choose_routes_bus, choose_true_or_false, mypath) {
  $.ajax({
    url: "/bus_way",
    data: {choose_routes_bus: choose_routes_bus, choose_true_or_false: choose_true_or_false},
      success: function(data) {
      var coordinate_bus = eval(data);
      for(var i = 0; i < coordinate_bus.length; i++) {
        var latLngInter =  new google.maps.LatLng(coordinate_bus[i].split(",")[1], coordinate_bus[i].split(",")[0]);
        path = mypath.getPath();
        path.push(latLngInter);
      }
    }
  });
}

function setMarkerCoordinateMap(choose_routes_bus, choose_true_or_false) {
  $.get("/bus_way", {choose_routes_bus: choose_routes_bus, choose_true_or_false: choose_true_or_false, flag: true},
  function(data, status) {
    if (status == "success") {
      for (var i = 0; i < data["TABLE"][0]["ROW"].length; i += 1) {
      }
    }
  });
}

$(function(){
  $("button#show").click(function(){
    var content_panel = document.getElementById("show").innerHTML;
    if (content_panel == "Show panel") {
      $("#divInfoOfRoute").show();
      $("#map-canvas").css("width", 1549);
      $("#map-canvas").css("left", 309);
      document.getElementById("show").innerHTML = "Hide panel";
    }
    else {
      $("#divInfoOfRoute").hide();
      $("#map-canvas").css("width", 1858);
      $("#map-canvas").css("left", 0);
      document.getElementById("show").innerHTML = "Show panel";
    }
  });
});


$(function() {
  var mypath;
  $("button#searchroutes").click(function() {
    var choose_routes_bus = $("#lstTuyen").val();
    var choose_true_or_false = $("input#chckLuotDi").prop('checked');
    var markerList = []

    // Function remove path after redraw path
    if(mypath != null) {
      mypath.setMap(null);
    }

    // Function set path include stroke weight, stroke opacity and stroke color
    mypath = new google.maps.Polyline({
      map: map,
      strokeWeight: 7,
      strokeOpacity: 0.8,
      strokeColor: "#BCCC00"
    });

    // Function process set marker coordinate to map
    setMarkerCoordinateMap(choose_routes_bus, choose_true_or_false);

    // Function process get data coordinate lat and long
    drawPathGoogleRoutes(choose_routes_bus, choose_true_or_false, mypath);
  });
});


