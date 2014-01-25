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
    map.overlays.clear(); // Clear any existing overlays on the map
    
    getInsta(map.center.latitude, map.center.longitude, function (data) {
	map.overlays.clear();
	heatMap(map,data);
    });
    /* Works but has near identical data to instagram
    getFlickr(map.center.latitude, map.center.longitude, function (data) {
         heatMap(map, data);
    }); */
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(foundUserLocation);
    }
    /* Doesn't work
    getTwitter(lat, lng, function (data) {

    });
    */

});
  
$( document ).mouseup(function(){
  getInsta(map.center.latitude, map.center.longitude, function (data) {
      map.overlays.clear();
	heatMap(map, data);
  });
 });

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


function getTwitter(lat, lng, callback) {
    var app_key = 'UQVGvAiVnMSJpqdefj44Jw';
    var access_token = 'AAAAAAAAAAAAAAAAAAAAABRMVwAAAAAAnE6%2F41mZ20HV2LVadOufnqih%2Fc8%3DAP8Dhd8DkaKCFhJ1Nn7ZedG5TmU54dRJ865U26ByLgU0oIlkuo';
    
    $.get('https://api.twitter.com/1.1/geo/search.json' +
	  '?lat=' + lat + '&long=' + lng +
	  '&accuracy=1000' + //1km radius,
	  function () {}, 'jsonp').done(
	      function (data) {
		  console.log(data);
	      });
    
}

function getFlickr(lat, lng, callback) {

    var api_key = '58a5bac6c4ba89f8bf7fd8485ea77f30';
    var api_secret = 'f79dc83eed4a187b';

    photo_data = [];

    $.getJSON('http://api.flickr.com/services/rest/' +
	      '?method=flickr.photos.search' +
	      '&format=json' +
	      '&api_key=' + api_key +
	      '&lat=' + lat + '&lon=' + lng +
	      '&radius=1&has_geo=1&jsoncallback=?' +
	      '&per_page=100', function (data) {
		  data = data.photos.photo;
		  var len = data.length;
		  for (var i = 0; i < len; i += 1) {
		      $.getJSON('http://api.flickr.com/services/rest/' +
			'?method=flickr.photos.geo.getLocation&format=json' +
			'&api_key=' + api_key + '&jsoncallback=?' +
			'&photo_id=' + data[i].id, function (pdata) {
			    photo_data.push({
				'latitude': pdata.photo.location.latitude,
				'longitude' : pdata.photo.location.longitude
			    });
			    if (photo_data.length == len) {
				callback(photo_data);
			    }
			});
		  }
	      });
	  
        
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
	  '&distance=7000' +
	  '&access_token=' + insta_access_token,
	  function () {}, 'jsonp').done(function (data) {
	      photo_data = []; // empty photo data array

              // Check to see if we got any data from instagram
	      if (data.data) {
		  var len = data.data.length; // get the length of the data
		  console.log(len);
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
