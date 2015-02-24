function AppViewModel() {
    var self = this;
    this.location = ko.observable("Aggius");
    //this.mapUrl = ko.observable('https://www.google.com/maps/embed/v1/search?q=aggius&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA');

    this.mapUrl = ko.computed(function() {
        return 'https://www.google.com/maps/embed/v1/search?q=' + this.location() + '&key=AIzaSyBVAy0aVHbQvQ6NRCQGAOBCFVSMzJOouYA';
    }, this);
}
 
ko.applyBindings(new AppViewModel());