/*var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 5,
    center: new google.maps.LatLng(55, 11),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});*/
    
function AppViewModel() {
    var self = this;
    self.location = ko.observable("Aggius");
    self.mapKey = ko.observable('&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA');
    self.$canvasMap = document.getElementById('map-canvas');
    self.geocoder = new google.maps.Geocoder();
    self.map = new google.maps.Map(this.$canvasMap);
    self.isAnyLocationSelected = ko.observable(false);

	self.mapUrl = ko.computed(function() {
        return 'https://www.google.com/maps/embed/v1/search?q=' + this.location() + this.mapKey();
    }, this);
    
    self.searchMap = function(d, e) {
        if (e.keyCode==13) { //ENTER_KEY
            /*var mapOptions = {
              center: { lat: -34.397, lng: 150.644},
              zoom: 8
            };            
            map = new google.maps.Map(this.$canvasMap, mapOptions);*/
        }
    }
    
    self.initializeGeocoder = function(coord) {
      var latlng = coord;
      var mapOptions = {
        zoom: 8,
        center: latlng
      }
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    self.addMap = function(d, e) {
    
      if (self.isAnyLocationSelected()==false) {
      	self.isAnyLocationSelected(true);
      }
        
      self.geocoder.geocode( { 'address': this.location() }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var coord = results[0].geometry.location;
          self.initializeGeocoder(coord);
          self.map.setCenter(coord);
          var marker = new google.maps.Marker({
              map: self.map, position: coord
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
}
// Geocoding request x milano:
// http://maps.google.com/maps/api/geocode/json?address=milano&sensor=false

ko.applyBindings(new AppViewModel());