var foursquareClientId = "U1SX4F1QWL0W5RR31NQ0NQIRLWFRH0VTHEFPPYBM32N1UL4W";
var foursquareClientSecret = "QZCEFLAGY3RIAEHQZNG0HPONYZF51IC0I3RKK1QDKZWDYK4B";
var googleKey = "AIzaSyCSJ-t2Apm2aS0ueEPkfSEqhXCDA8Ab8xg";
var map, largeInfoWindow, bounds, flag;

// Knockout ViewModel
var ViewModel = function(loc) {
    var self = this;
    this.categoryList = ko.observableArray(['Food', 'Coffee', 'Shopping', 'Nightlife']);
    this.venueList = ko.observableArray([]);
    //Add venues retreived from the API to the list and make its markers on the map
    this.addVenue = function (item) {
        var marker = new google.maps.Marker({
            position: {lat: item.venue.location.lat, lng: item.venue.location.lng},
            map: map,
            name: item.venue.name,
            address: item.venue.location.formattedAddress,
            animation: google.maps.Animation.DROP
        });
        self.venueList.push(marker);
        marker.addListener('click', function() {
            self.openInfoWindow(this);
        });
        bounds.extend(marker.position);
    };
    // Opens up infoWindow, sets marker Animation and adds content to it
    this.openInfoWindow = function (marker) {
            if(flag && flag.getAnimation() !== null) {
                flag.setAnimation(null);
            }
            largeInfoWindow.marker = marker;
            largeInfoWindow.setContent('<div><strong>' + marker.name + '</strong></div><br>' + "Address: " + marker.address + '</div>');
            largeInfoWindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            flag = marker;
            largeInfoWindow.addListener('closeclick',function(){
                marker.setAnimation(null);
            });
    };
    // Hides all venue markers when called
    this.hideAllMarkers = function() {
        for (var i = 0; i < self.venueList().length; i++) {
            self.venueList()[i].setMap(null);
        }
    };
    // Makes request to Foursquare for searched location and category
    this.makeRequest = function(lat, lng, cat) {
        loc.lat = lat;
        loc.lng = lng;
        self.hideAllMarkers();
        self.venueList([]);
        self.requestFoursquare(cat);
    };
    // Uses the value of new location or category and displays venues accordingly
    this.search = function() {
        var c = $('#categoryList').val();
        var l = $('#location').val();
        if(c === '' && l === '') {
            self.hideAllMarkers();
            self.venueList([]);
            self.initialMarkers();
        }
        else if(l === '' && c!== '') {
            self.makeRequest(loc.lat, loc.lng, c);
        }
        else {
            l = l.replace(/ /g, "+");
            var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${l}&key=${googleKey}`;
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    var lat = response.results[0].geometry.location.lat;
                    var lng = response.results[0].geometry.location.lng;
                    if(c === '') {
                        loc.lat = lat;
                        loc.lng = lng;
                        self.hideAllMarkers();
                        self.venueList([]);
                        self.initialMarkers();
                    }
                    else {
                        bounds = new google.maps.LatLngBounds();
                        self.makeRequest(lat, lng, c);
                    }
                },
                error: function() {
                    window.alert('Failed to load Google Geocode API! Check your network or firewall');
                }        
            });
        }
    };
    // Make an ajax request to Foursquare
    this.requestFoursquare = function (cat) {
        $.ajax({
            url: `https://api.foursquare.com/v2/venues/explore?limit=5&range=3000&ll=${loc.lat},${loc.lng}&client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20181014&query=` + cat,
            method: 'GET',
            dataType: 'json',
            success: function(result) {
                var venues = result.response.groups[0].items;
                venues.forEach(self.addVenue);
                map.fitBounds(bounds);
            },
            error: function() {
                window.alert('Failed to load Foursquare data! Check your network or firewall');
            }        
        });
    };
    // Create all markers
    this.initialMarkers = function () {
        bounds = new google.maps.LatLngBounds();
        self.categoryList().forEach(self.requestFoursquare);
    };
    this.initialMarkers();
};

// Map Callback function
function initMap() {
    var defaultLocation = {lat: 30.741482, lng: 76.768066};
    var locationAutoComplete = new google.maps.places.Autocomplete(document.getElementById('location'));
    navigator.geolocation.getCurrentPosition(
        function (pos) {
            var location = {};
            location.lat = pos.coords.latitude;
            location.lng = pos.coords.longitude;
            map(location);
        },
        function (err) {
            window.alert('Permission denied! Using default location "Chandigarh, IN"');
            map(defaultLocation);
        }
    );
}

// Makes a map for the location
function map(location) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: location,
        mapTypeControl: false
    });
    
    largeInfoWindow = new google.maps.InfoWindow();

    ko.applyBindings(new ViewModel(location));

    var elem2 = document.querySelector('select');
    var instance2 = M.FormSelect.init(elem2, {});
}