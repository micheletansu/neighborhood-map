var selectedMaps = [];
var currentLocation = "amsterdam";

function AppViewModel() {
    var self = this;

    self.selectedMaps = ko.observableArray(selectedMaps);
    self.location = ko.observable(currentLocation);
	self.mapKey1 = '&key=AIzaSyDYeZOsWrLE65cpwtgMjgMutO8pUXp-wMk';
	//self.mapKey2 = '&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA';

    self.geocoder = new google.maps.Geocoder();
    self.mapUrl = ko.computed(function() {
        return 'https://www.google.com/maps/embed/v1/search?q=' + this.location() + this.mapKey1;
    }, self);
    self.$leftBar = document.getElementsByClassName('rightBar')[0];
    
    // Metodo sollevato all'invio nell'input di ricerca'
    self.searchMap = function(d, e) {
        if (e.keyCode==13) { //ENTER_KEY
        }
    }

	// Aggiunge una mappa con un maker relativa alla mappa nella sezione principale
    self.addMap = function(d, e) {
      var $boxDiv = document.createElement('div');
      $boxDiv.className = 'box-sel';
      self.$leftBar.appendChild($boxDiv);

      var $selectedMapDiv = document.createElement('div');
      $selectedMapDiv.id = 'sel-map'+self.selectedMaps().length;
      $selectedMapDiv.className = 'sel-map';
      $boxDiv.appendChild($selectedMapDiv);

      var $selectedInfoDiv = document.createElement('div');
      $selectedInfoDiv.className = 'sel-info';
      $selectedInfoDiv.textContent = 'oooooooooooooooo';
      $boxDiv.appendChild($selectedInfoDiv);

      var $clearDiv = document.createElement('div');
      $clearDiv.className = 'clear-div';
      $boxDiv.appendChild($clearDiv);
        
      self.geocoder.geocode( { 'address': this.location() }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var coord = results[0].geometry.location;
          var map = new google.maps.Map($selectedMapDiv, {
            zoom: 8, center: coord
          });
          var marker = new google.maps.Marker({
            map: map, position: coord
          });
          self.selectedMaps.push(map);

        } else { alert("Geocode was not successful for the following reason: " + status); }
      });
    }
}
// Geocoding request x milano:
// http://maps.google.com/maps/api/geocode/json?address=milano&sensor=false

ko.applyBindings(new AppViewModel());