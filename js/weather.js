if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        getWeather(position.coords.latitude + ',' + position.coords.longitude);
    });
}
else {
    getWeather('Los Angeles, CA');
}

$(document).ready(function() {  
  setInterval(getWeather, 7000); //Update the weather every 10 minutes.
});

function getWeather(location) {	

	if (document.getElementById("toggle").checked) {
		degreeUnit = 'c';
		location = "Toronto";
	}
	else {
		degreeUnit = 'f';
		location = "Los Angeles";
	}
	
	$.simpleWeather({
    location: location,
    woeid: '',
    unit: document.getElementById("toggle").checked ? 'c' : 'f',
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