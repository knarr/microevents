var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var browserSupportFlag =  new Boolean();

function locationlocation() {
  var myOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = siberia;
    }
    map.setCenter(initialLocation);
  }
}






===================================================

var currentlatlng;

//get current location
function currentLocation(position){
	$wait.fadeIn(function(){
		//$("#locationBar").fadeOut();
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		currentlatlng = new google.maps.LatLng(latitude, longitude);
		console.log ("current position is: " + currentlatlng);
		//reverse geocode
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({'latLng': currentlatlng}, function(results, status) {
      		if (status == google.maps.GeocoderStatus.OK) {
        		if (results[1]) {
					formattedAddress = results[1].formatted_address;
					console.log(formattedAddress);
					if (formattedAddress.indexOf("USA") !=-1) {
						console.log("in the USA");
						$("#omnom").show();
					}
          		}
      		}
			else {
        	console.log("Geocoder failed due to: " + status);
      		}
    	});

		//getPlaces(currentlatlng);
		alert(currentlatlng);
	});
	
}