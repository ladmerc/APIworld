$(document).ready(function () {

  $('#canvas').html('<center><img src="img/loading4.gif" alt="loading..."><p>Loading......</p></center>');
  function initialize() {
    var mapOptions = {
      center: { lat: 6.4531, lng: 150.644},
      zoom: 10,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("canvas"), mapOptions);


    if (navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
        map.setZoom(15);
     });
    } 
    else {
      error('Geo Location is not supported');
    }

    var middle = map.getCenter()
    var marker = new google.maps.Marker({
      position: middle,
      map: map,
      title: "Current Location"
    });
  }

  function codeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = $("#search").val();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Your search returned no result because of: " + status);
      }
    });
  }

$('button').click(codeAddress);
google.maps.event.addDomListener(window, 'load', initialize);
})//end ready;

// 6.4531° N, 3.3958° E