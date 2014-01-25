$(function() {
    
    var lat = 41.8262;
    var lng = -71.4032;
    
    var container = document.getElementById("map");

    var map = new nokia.maps.map.Display(container, {
	components: [
            new nokia.maps.map.component.Behavior(), 
            new nokia.maps.map.component.ZoomBar()],
	zoomLevel: 14,
	center: [lat, lng]
    });

    map.overlays.clear(); // Clear any existing overlays on the map
    getInsta(lat, lng, function (data) {
	console.log(data);
	heatMap(map, data);
    });

    
    
});

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
	  '&count=100' + 
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
               //  
	      }
	      // Return the gathered data
              log(data.data[i].location);
	      callback(photo_data);
	  });


}
