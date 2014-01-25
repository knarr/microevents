var map;

$(function() {
    
    var lat = 41.8262;
    var lng = -71.4032;
    
    var container = document.getElementById("map");

    map = new nokia.maps.map.Display(container, {
	components: [
            new nokia.maps.map.component.Behavior(), 
            new nokia.maps.map.component.ZoomBar(), 
            new nokia.maps.map.component.Overview(),
            new nokia.maps.map.component.TypeSelector(),
            new nokia.maps.map.component.ScaleBar()
            ],
	zoomLevel: 14,
	minZoomLevel: 11,
    
	center: [lat, lng]
    });
    
    redraw(); // Draw the heatmap
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(foundUserLocation);
    }

});

// Redraw the heatmap on top of the map
function redraw() {
  getInsta(map.center.latitude, map.center.longitude, function (data) {
      map.overlays.clear();
	heatMap(map, data.photo_data);
        console.log(data.popular_image);
        $('.show_image')[0].src = data.popular_image;
	$('.show_image')[1].src = data.display_images[0];
        console.log($('#show_image'));
  });

  // Works but has near identical data to instagram
  // getFlickr(map.center.latitude, map.center.longitude, function (data) { });
  // Doesn't work
  // getTwitter(lat, lng, function (data) { });
}
  
$( document ).mouseup(redraw); // Redraw when the map is moved
$( document ).vmouseup(redraw); // Redraw when the map is moved


function foundUserLocation(location) {
  map.setCenter(location.coords);
}

// Draw a heatmap ontop of the given map, using the data as src
function heatMap(map, data) {
    var heatmap = new nokia.maps.heatmap.Overlay({
	max: 20,
	opacity: 1,
	type: "density",
	coarseness: 2
    });
    heatmap.addData(data); // Add the heat map data to the map
    map.overlays.add(heatmap);
}




function doClick() {
    var address = document.getElementById('addressInput').value;
    var key = 'Fmjtd%7Cluur29082d%2Ca5%3Do5-90z2la';
    
    $.getJSON('http://www.mapquestapi.com/geocoding/v1/address' +
	      '?key=' + key +
	      '&location=' + address +
	      '&jsoncallback=renderGeocode', function () {}, 'jsonp').done(
		  function (data) {
		      var location = data.results[0].locations[0].latLng;
		      console.log(location);
		      map.setCenter({"latitude":location.lat,"longitude":location.lng});
          map.setZoomLevel(14);
		      redraw();
		  });
}

