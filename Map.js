function init() {
	//alert("ready");
	var mapOptions = {
		center: new google.maps.LatLng(41.831420, -87.627188),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		mapTypeControl: true
	};

	var mapCanvas = document.getElementById('map-div');

	var map = new google.maps.Map(mapCanvas, mapOptions);

	var marker = new google.maps.Marker({
    	map: map,
    	position: new google.maps.LatLng(41.831420, -87.627188),
    	icon: 'pictures/Pointer.png',
    	animation: google.maps.Animation.DROP,
    	title: 'IIT'
    });

    var windowContent = '<div id="IIT-info"><h1>IIT Tower: IIT</h1><p>10 West 35th Street<br>Chicago, IL 60616<br>Phone: 312.567.3175</p></div>';

    var infowindow = new google.maps.InfoWindow({
            content: windowContent
        });

    google.maps.event.addListener(marker, 'click', function(){
            infowindow.open(map, marker);
    });

    // Geolocation below
    function moveMap(loc){
      //console.log(loc.coords);
      map.panTo(new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude));
      map.setZoom(16);
    }

    document.getElementById('mylocation-btn').addEventListener('click', function(){
    	navigator.geolocation.getCurrentPosition(moveMap);
    });

    document.getElementById('textbox-btn').addEventListener('click', function(){
      var address = document.getElementById('address-textbox').value;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address':address}, function(results, status){
        if (status === google.maps.GeocoderStatus.OK) {
          map.panTo(results[0].geometry.location);
          map.setZoom(18);
        } else {
          alert('Can not locate address');
        }
      });
    });


}

google.maps.event.addDomListener(window, 'load', init);