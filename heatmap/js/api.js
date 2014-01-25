
// Returns a list 
function getWhisper(lat, lng, callback) {
    $.get('http://prod.whisper.sh/whispers/nearby' +
	  '?limit=100' +
	  '&lat=' + lat + '&lon=' + lng
	      , function () {}, 'jsonp').done(
		  function (data) {
		      var text_data = [];
		      for (i in data.nearby) {
			  text_data.push(data.nearby[i].text);
		      }
		      callback(text_data);
		  });
}



// Gets the location data for photos around lat,lng
// apparently gets the 500 most recent photos taken near the center of the map
// callback is called when the data has been loaded
function getInsta(lat, lng, callback) {

    // Instagram access token generated from app web page
    var insta_access_token = '1018228713.7d40b7d.faae893fb8954267b98784c89cc2aaee';
    var dist = 2000 * Math.pow(2.4, 14)/Math.pow(2.4, map.zoomLevel);
    $.get('https://api.instagram.com/v1/media/search?' +
	  'lat=' + lat + '&lng=' + lng +
	  '&count=200' +
	  '&distance=' + dist +
	  '&access_token=' + insta_access_token,
	  function () {}, 'jsonp').done(function (data) {
	      photo_data = []; // empty photo data array

              // Check to see if we got any data from instagram
	      if (data.data) {
		  var len = data.data.length; // get the length of the data

                  var display_images = [];
                  var popular_image_index = 0
                  var num_images = 2;

		  // Gather together the data from instagram
		  for (var i = 0; i < len; i += 1) {
		      photo_data.push({
			  'latitude'  : data.data[i].location.latitude,
			  'longitude' : data.data[i].location.longitude
                      
		      });
                  if (data.data[i].likes.count > data.data[popular_image_index].likes.count) {
		      popular_image_index = i;
                  }
                      
		  }
                  for (var x = 0; x < num_images; x++) {
                      var randomnumber=Math.floor(Math.random()*photo_data.length)
                      display_images.push(getImage(data.data[randomnumber]));
                  }
                  
                  console.log(data.data[randomnumber]);
	      }
	      // Return the gathered data
	      callback({'photo_data': photo_data, 'display_images': display_images, 'popular_image': getImage(data.data[popular_image_index])});
            
      });
}

function getImage(imageData) {
    return imageData.images.low_resolution.url;

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

    var dist = 2000 * Math.pow(2.4, 14)/Math.pow(2.4, map.zoomLevel);
    
    $.getJSON('http://api.flickr.com/services/rest/' +
	      '?method=flickr.photos.search' +
	      '&format=json&extras=geo' +
	      '&api_key=' + api_key +
	      '&lat=' + lat + '&lon=' + lng +
	      '&radius=' + 20 +
	      '&jsoncallback=?' +
	      '&per_page=500', function (data) {
		  data = data.photos.photo;
		  var len = data.length;
		  for (var i = 0; i < len; i += 1) {
		      photo_data.push({
			  'latitude': data[i].latitude,
			  'longitude': data[i].longitude
		      });
		  }
		  callback(photo_data);
	      });
}
