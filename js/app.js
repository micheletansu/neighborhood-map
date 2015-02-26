var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 5,
    center: new google.maps.LatLng(55, 11),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
    
function AppViewModel() {
    var self = this;
    self.location = ko.observable("Aggius");
    self.mapKey = ko.observable('&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA');
    self.$canvasMap = document.getElementById('map-canvas');
    self.geocoder = new google.maps.Geocoder();
    self.map = new google.maps.Map(this.$canvasMap);

	self.mapUrl = ko.computed(function() {
        return 'https://www.google.com/maps/embed/v1/search?q=' + this.location() + this.mapKey();
    }, this);
    
    self.searchMap = function(d, e) {
        if (e.keyCode==13) { //ENTER_KEY
            var mapOptions = {
              center: { lat: -34.397, lng: 150.644},
              zoom: 8
            };
            //this.map = new google.maps.Map(this.$canvasMap, mapOptions);
            map = new google.maps.Map(this.$canvasMap, mapOptions);;
        }
    }

    self.addMap = function(d, e) {
    
      self.geocoder.geocode( { 'address': this.location() }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
}
// Geocoding request x milano:
// http://maps.google.com/maps/api/geocode/json?address=milano&sensor=false
/*
ko.bindingHandlers.map = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        var latLng = new google.maps.LatLng(
            ko.utils.unwrapObservable(mapObj.lat),
            ko.utils.unwrapObservable(mapObj.lng));
        var mapOptions = { center: latLng,
                          zoom: 6, 
                          mapTypeId: google.maps.MapTypeId.ROADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);

        mapObj.marker = new google.maps.Marker({
            map: mapObj.googleMap,
            position: latLng,
            title: "You Are Here",
            draggable: true
        });     

        mapObj.onChangedCoord = function(newValue) {
            var latLng = new google.maps.LatLng(
                ko.utils.unwrapObservable(mapObj.lat),
                ko.utils.unwrapObservable(mapObj.lng));
            mapObj.googleMap.setCenter(latLng);                 
        };

        mapObj.onMarkerMoved = function(dragEnd) {
            var latLng = mapObj.marker.getPosition();
            mapObj.lat(latLng.lat());
            mapObj.lng(latLng.lng());
        };

        mapObj.lat.subscribe(mapObj.onChangedCoord);
        mapObj.lng.subscribe(mapObj.onChangedCoord);  

        google.maps.event.addListener(mapObj.marker, 'dragend', mapObj.onMarkerMoved);

        $("#" + element.getAttribute("id")).data("mapObj",mapObj);
    }
};
*/
ko.applyBindings(new AppViewModel());