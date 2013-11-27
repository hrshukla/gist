//SETTINGS - NEEDS TO BE CHANGED
//var WEBHOOK_START = "";
//var WEBHOOK_STOP = "";
//END

//Check if tracking is ON
if(localStorage.tracking == 1) {	// Tracking on
    //Hide start button if tracking is ON
    $('#start').hide();
}
else {	// Tracking off
    // Hide the stop button
    $('#stop').hide();
}


//Start tracking phone
$("#start").click(function() {
  // $.post(WEBHOOK_START, function() {
     localStorage.tracking = 1;
     $('#start').hide();  // Hide Start
     $('#stop').show();   // Show Stop
});

//Stop tracking phone
$("#stop").click(function() {
 //  $.post(WEBHOOK_STOP, function() {
     localStorage.tracking = 0;
     $('#stop').hide();
     $('#start').show();
});

//Load Google maps

var map = "";
var marker = "";
var mapLoaded = false;


google.load("maps", "3", {other_params:'sensor=false', callback: function(){
        
    var mapOptions = {
    	zoom: 20,
    	center: new google.maps.LatLng(0, 0),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
    map = new google.maps.Map($('#phone-map').get(0), mapOptions);
    marker = new google.maps.Marker({
      	position: new google.maps.LatLng(0, 0),
      	map: map,
      	title: 'Your iDevice is here!'
    });
  	    
    console.log("google maps loaded");
    mapLoaded = true;
  		
}});

//Update the marker when data is incomming
function updateMarker(coords) {
   //Update marker
   var LatLng = new google.maps.LatLng(coords.latitude, coords.longitude);
   marker.setPosition(LatLng);
   map.setCenter(marker.getPosition());
}

//Check for incomming data
scope.onData = function(data) {
	console.log("Data Incoming: "+JSON.stringify(data));
	var coords;
	var json = JSON.stringify(data.DA);
	json = JSON.parse(json);
	coords = json;
	
	if(!mapLoaded) {
    	setTimeout(function() { updateMarker(coords); }, 1000); 
	}
	else {
		updateMarker(coords);
	}
     
	console.log("Data incomming: "+coords.latitude+':'+coords.longitude);
  
};