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
	heatMap(map, data);
  });

  // Works but has near identical data to instagram
  // getFlickr(map.center.latitude, map.center.longitude, function (data) { });
  // Doesn't work
  // getTwitter(lat, lng, function (data) { });
}
  
$( document ).mouseup(redraw); // Redraw when the map is moved

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





// Gets the location data for photos around lat,lng
// apparently gets the 500 most recent photos taken near the center of the map
// callback is called when the data has been loaded
function getInsta(lat, lng, callback) {

    // Instagram access token generated from app web page
    var insta_access_token = '1018228713.7d40b7d.faae893fb8954267b98784c89cc2aaee';

    $.get('https://api.instagram.com/v1/media/search?' +
	  'lat=' + lat + '&lng=' + lng +
	  '&count=200' +
	  '&distance=2000' +
	  '&access_token=' + insta_access_token,
	  function () {}, 'jsonp').done(function (data) {
	      photo_data = []; // empty photo data array

              // Check to see if we got any data from instagram
	      if (data.data) {
		  var len = data.data.length; // get the length of the data

		  // Gather together the data from instagram
		  for (var i = 0; i < len; i += 1) {
		      photo_data.push({
			  'latitude'  : data.data[i].location.latitude,
			  'longitude' : data.data[i].location.longitude
		      });
		  }
	      }
	      // Return the gathered data
	      callback(photo_data);
      });
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
		      redraw();
		  });
}