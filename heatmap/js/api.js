

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
