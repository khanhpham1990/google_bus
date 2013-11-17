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

function setMarkerCoordinateMap(choose_routes_bus, choose_true_or_false, markerList) {
  // Function remove all marker in the map
  if (markerList.length != 0) {
    removeMarker(markerList);
  }

  $.get("/bus_way", {choose_routes_bus: choose_routes_bus, choose_true_or_false: choose_true_or_false, flag: true},
  function(data, status) {
    if (status == "success") {
      document.getElementById("divInfoOfRoute").innerHTML = "";
      for (var i = 0; i < data["TABLE"][0]["ROW"].length; i += 1) {
        var utmInter = new UTMRef(data["TABLE"][0]["ROW"][i]["COL"][3]["DATA"], data["TABLE"][0]["ROW"][i]["COL"][4]["DATA"], "N", 48);
        var llInter = utmInter.toLatLng();
        var latLngInter = new google.maps.LatLng(llInter.lat, llInter.lng);
        document.getElementById('divInfoOfRoute').innerHTML += "<div class=\"report\" onclick=\"moveTo(" + llInter.lat + ", " + llInter.lng + ",'" + data["TABLE"][0]["ROW"][i]["COL"][0]["DATA"]
        + ' ' + data["TABLE"][0]["ROW"][i]["COL"][1]["DATA"] + ' Quận ' + data["TABLE"][0]["ROW"][i]["COL"][2]["DATA"] + "');\">" +
          "[" + i + "][" +  data["TABLE"][0]["ROW"][i]["COL"][7]["DATA"] + "]" +
        data["TABLE"][0]["ROW"][i]["COL"][0]["DATA"] + ' ' + data["TABLE"][0]["ROW"][i]["COL"][1]["DATA"] + ' Quận ' + data["TABLE"][0]["ROW"][i]["COL"][2]["DATA"] + '</div>';

        var marker = new google.maps.Marker({
          position: latLngInter,
          title: data["TABLE"][0]["ROW"][i]["COL"][0]["DATA"] + ' ' + data["TABLE"][0]["ROW"][i]["COL"][1]["DATA"] + ' Quận ' + data["TABLE"][0]["ROW"][i]["COL"][2]["DATA"],
          map: map,
          icon: "./app/assets/images/mapicons/number_" + i + ".png"
        });
        markerList.push(marker);
      }
      map.panTo(markerList[0].getPosition());
    }
  });
}

function removeMarker(markerList) {
  while(markerList[0]) {
    markerList.pop().setMap(null);
  }
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
  var markerList = []
  $("button#searchroutes").click(function() {
    var choose_routes_bus = $("#lstTuyen").val();
    var choose_true_or_false = $("input#chckLuotDi").prop('checked');

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
    setMarkerCoordinateMap(choose_routes_bus, choose_true_or_false, markerList);

    // Function process get data coordinate lat and long
    drawPathGoogleRoutes(choose_routes_bus, choose_true_or_false, mypath);
  });
});


