/* Global variables */
var degreeUnit = 'f';
var local;
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        local = position.coords.latitude + ',' + position.coords.longitude;
        getWeather(local, degreeUnit);
    });
}
else {
    getWeather('Los Angeles');
}

$(document).ready(function() {  
  setInterval(updateWeather, 3000); //Update the weather every 3000ms.
});
function updateWeather(){
	/* Update weather */
	if (document.getElementById("toggle").checked) {
		degreeUnit = 'c';
	}
	else {
		degreeUnit = 'f';
	}
	getWeather(local, degreeUnit);
}

function getWeather(location, unit) {	
		
	$.simpleWeather({
    location: location,
    woeid: '',
    unit: unit,
    success: function(weather) {
	    var city = weather.city;
        var temp = weather.temp + '&deg;';
        var wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
        var wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
        var humidity = weather.humidity + ' %';
  
		$(".location").html(city);
        $(".temperature").html(temp);
        $(".climate_bg").html(wcode);
        $(".windspeed").html(wind);
        $(".humidity").html(humidity);
    },
    
    error : function(error) {
            $(".error").html('<p>' + error + '</p>');
    }
  });
}