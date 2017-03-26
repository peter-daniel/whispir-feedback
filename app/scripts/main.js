$(document).ready(function() {

    // get the input values WITHOUT using a form tag
    var emailValue;
    var nameValue;
    var feedbackValue;


    $('#name').keyup(function(e) {
        nameValue = e.target.value;
        console.log('name:' + nameValue)
    });

    $('#email').keyup(function(e) {
        emailValue = e.target.value;
        console.log('email:' + emailValue)
    });

    $('#feedback').keyup(function(e) {
        feedbackValue = e.target.value;
        console.log('email:' + feedbackValue)
    });

    $('#submit').on('click', function() {
        $('.name-error').addClass('hidden');
        $('.email-error').addClass('hidden');
        $('.feedback-error').addClass('hidden');
        $('.success-page').addClass('hidden');
        var success = 0;

        // check and show appropriate error messages for each input
        if (typeof emailValue === 'undefined') {
            $('.email-error').removeClass('hidden');
        } else {
            if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                $('.email-error').removeClass('hidden');
            }
        }

        if (typeof nameValue === 'undefined') {
            $('.name-error').removeClass('hidden');
        } else {
            if (!nameValue.match(/^(?:[\u00c0-\u01ffa-zA-Z'-]){2,}(?:\s[\u00c0-\u01ffa-zA-Z'-]{2,})+$/i)) {
                $('.name-error').removeClass('hidden');
            } else {
              success++;
            }
        }

        if (typeof feedbackValue === 'undefined') {
            $('.feedback-error').removeClass('hidden');
        } else {
            if (!feedbackValue.match(/^[a-z ,.'-]+$/i)) {
                $('.feedback-error').removeClass('hidden');
            } else {
              success++;
            }
        }
        // check all are correct and show success message
        if (typeof feedbackValue === 'undefined') {
            $('.feedback-error').removeClass('hidden');
        } else {
            if (!feedbackValue.match(/^[a-z ,.'-]+$/i)) {
                $('.feedback-error').removeClass('hidden');
            } else {
              success++;
            }
        }
        console.log(success)
        if (success === 3) {
          $('.form-block').addClass('hidden');
          $('.success-page').removeClass('hidden');
        }
    })

});
// google maps - display current location
function initMap() {
    var startPoint = {
        lat: -37.8153467,
        lng: 144.9583246
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: startPoint,
        zoom: 10,
        scrollwheel: false,
        styles: [{
            'featureType': 'administrative',
            'elementType': 'all',
            'stylers': [{
                'saturation': '-100'
            }]
        }, {
            'featureType': 'administrative.province',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'on'
            }]
        }, {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [{
                'saturation': -100
            }, {
                'lightness': 65
            }, {
                'visibility': 'on'
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [{
                'saturation': -100
            }, {
                'lightness': '50'
            }, {
                'visibility': 'simplified'
            }]
        }, {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [{
                'saturation': '-100'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'simplified'
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'all',
            'stylers': [{
                'lightness': '30'
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'all',
            'stylers': [{
                'lightness': '40'
            }]
        }, {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [{
                'saturation': -100
            }, {
                'visibility': 'simplified'
            }]
        }, {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [{
                'hue': '#ffff00'
            }, {
                'lightness': -25
            }, {
                'saturation': -97
            }]
        }, {
            'featureType': 'water',
            'elementType': 'labels',
            'stylers': [{
                'lightness': -25
            }, {
                'saturation': -100
            }]
        }]
    });
    var im = '/images/bluedot.png';
    var marker = new google.maps.Marker({
        icon: im,
        map: map
    });
    var infoWindow = new google.maps.InfoWindow({
      map: map,
      pixelOffset: new google.maps.Size(0,-33)
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Your location');
            marker.setPosition(pos);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
