var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 5,
    center: new google.maps.LatLng(55, 11),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

function AppViewModel() {
    var self = this;
    self.location = ko.observable("Aggius");
    self.quotaUser = ko.observable('quotaUser=mich');
    self.mapKey = ko.observable('&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA');
    self.$canvasMap = document.getElementById('map-canvas');
    //self.map = {};

    self.mapUrl = ko.computed(function() {
        return 'https://www.google.com/maps/embed/v3/search?q=' + this.location() + this.mapKey();
    }, this);

    self.addMap = function(d, e) {
        if (e.keyCode==13) { //ENTER_KEY
            var mapOptions = {
              center: { lat: -34.397, lng: 150.644},
              zoom: 8
            };
            //this.map = new google.maps.Map(this.$canvasMap, mapOptions);
            map = new google.maps.Map(this.$canvasMap, mapOptions);
        }
    }
}
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