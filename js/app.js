var model = {
	init: function() {
		if (!localStorage.selectedMaps) {
			localStorage.selectedMaps = JSON.stringify([]);
			localStorage.currentLocation = JSON.stringify("Bonifacio");
		}
	},
	addResult: function(obj) {
		var data = JSON.parse(localStorage.selectedMaps);
		data.push(obj);
		localStorage.selectedMaps = JSON.stringify(data);
	},
	removeResult: function(obj) {
		var data = JSON.parse(localStorage.selectedMaps);
		var index = -1;
		data.forEach(function(v, i) {
		   if (this.place_id==v.place_id) 
		   		index=i;
		}, obj); 
		if (index > -1)
			data.splice(index, 1);
			
		localStorage.selectedMaps = JSON.stringify(data);
	},
	getAllResults: function() {
		return JSON.parse(localStorage.selectedMaps);
	},

	getCurrentLocation: function() {
		return JSON.parse(localStorage.currentLocation);
	},
	setCurrentLocation: function(loc) {
		localStorage.currentLocation = JSON.stringify(loc);
	}
};

function AppViewModel() {
    var self = this;
    model.init();
    
    self.mapKey1 = '&key=AIzaSyDYeZOsWrLE65cpwtgMjgMutO8pUXp-wMk';
	//self.mapKey2 = '&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA';
    self.selectedMaps = ko.observableArray(model.getAllResults());
    self.location = ko.observable(model.getCurrentLocation());

    self.mapUrl = ko.computed(function() {
        return 'https://www.google.com/maps/embed/v1/search?q=' + self.location() + self.mapKey1;
    }, self);
    
    // Metodo invocato all'invio nell'input di ricerca'
    self.searchMap = function(d, e) {
        if (e.keyCode==13) { //ENTER_KEY
        	model.setCurrentLocation(e.target.value);
        }
    }

	// Aggiunge una mappa con un maker relativa alla mappa nella sezione principale
    self.addMap = function(d, e) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': self.location() }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          
          model.addResult(results[0]);
          self.selectedMaps.push(results[0]);
		  
        } else { alert("Geocode was not successful for the following reason: " + status); }
      });
    }

    self.removeMap = function(data, e) {
    	model.removeResult(data);
    	self.selectedMaps.remove(data);
    }
};
// Geocoding request x milano:
// http://maps.google.com/maps/api/geocode/json?address=milano&sensor=false

ko.bindingHandlers.googlemap = {
	init: function (element, valueAccessor) {
		var value = valueAccessor();
		var	latLng = new google.maps.LatLng(value.latitude, value.longitude);
		var	mapOptions = {
			zoom: 8,
			center: latLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var	map = new google.maps.Map(element, mapOptions);
		var	marker = new google.maps.Marker({
			position: latLng,
			map: map
		});
	}
}

ko.applyBindings(new AppViewModel());



/* Before I built HTML elements from here:
var selectedListView = {
	$leftBar: null,
	
	init: function(selectedMaps) {
		this.$leftBar = document.getElementsByClassName('rightBar')[0];
		for (i=0; i<selectedMaps().length; i++)
			this.add(selectedMaps()[i]);
	},

	add: function(result) {

	  var $boxDiv = document.createElement('div');
      $boxDiv.className = 'box-sel';
      this.$leftBar.appendChild($boxDiv);

      var $selectedMapDiv = document.createElement('div');
      $selectedMapDiv.id = 'sel-map'+model.getAllResults.length;
      $selectedMapDiv.className = 'sel-map';
      $boxDiv.appendChild($selectedMapDiv);

      var $selectedInfoDiv = document.createElement('div');
      $selectedInfoDiv.className = 'sel-info';
      $selectedInfoDiv.textContent = result.formatted_address;
      $boxDiv.appendChild($selectedInfoDiv);

      var $clearDiv = document.createElement('div');
      $clearDiv.className = 'clear-div';
      $boxDiv.appendChild($clearDiv);
      

	  var coord = new google.maps.LatLng(
			parseFloat(result.geometry.location.k),
			parseFloat(result.geometry.location.D)
	  );
	  var map = new google.maps.Map($selectedMapDiv, {
		zoom: 8, center: coord
	  });
	  var marker = new google.maps.Marker({
		map: map, position: coord
	  });
	}
};*/