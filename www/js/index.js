/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



(function() {
// initializes touch and scroll events
        var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

 // handles swipeup and swipedown
        $.event.special.swipeupdown = {
            setup: function() {
                var thisObject = this;
                var $this = $(thisObject);

                $this.bind(touchStartEvent, function(event) {
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [ data.pageX, data.pageY ],
                                origin: $(event.target)
                            },
                            stop;

                    function moveHandler(event) {
                        if (!start) {
                            return;
                        }

                        var data = event.originalEvent.touches ?
                                event.originalEvent.touches[ 0 ] :
                                event;
                        stop = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ]
                        };

                        // prevent scrolling
                        if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                            event.preventDefault();
                        }
                    }

                    $this
                            .bind(touchMoveEvent, moveHandler)
                            .one(touchStopEvent, function(event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                    Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                    Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                        .trigger("swipeupdown")
                                        .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
                });
            }
        };

//Adds the events to the jQuery events special collection
        $.each({
            swipedown: "swipeupdown",
            swipeup: "swipeupdown"
        }, function(event, sourceEvent){
            $.event.special[event] = {
                setup: function(){
                    $(this).bind(sourceEvent, $.noop);
                }
            };
        });

    })();




$( "#popupPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();

        $( "#popupPanel" ).css( "height", h );
    }
});

$("#tapDemo").bind('tap', function(){
    $this = $(this);
    if ($this.hasClass('tap')) {
        $this.removeClass('tap');
    }else{
        $this.addClass('tap');
    };
});

$("#tapHoldDemo").bind('taphold', function(){
    $this = $(this);
    if ($this.hasClass('tap')) {
        $this.removeClass('tap');
    }else{
        $this.addClass('tap');
    };
});

$("#swipeDemo").bind('swipeup', function(){
    $this = $("#swipeDemo div");
    $this.removeClass('swipe');
});

$("#swipeDemo").bind('swipedown', function(){
    $this = $("#swipeDemo div");
    $this.addClass('swipe');
});

$("#swipeHDemo").bind('swipeleft', function(){
    $this = $("#swipeHDemo div");
    $this.css({left:"50%"}).animate({"left":"0%"}, "slow");
});

$("#swipeHDemo").bind('swiperight', function(){
    $this = $("#swipeHDemo div");
    $this.css({left:"0%"}).animate({"left":"50%"}, "slow");
});

$(document).bind('orientationchange', function(e){
    if ($('.ui-page-active').attr('id') == 'gestures') {
        $("#horientation").text(e.orientation);
    };
});

$(document).bind('pageinit', function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    <!-- Refresh list to the end of sort to have a correct display -->
    $( "#sortable" ).bind( "sortstop", function(event, ui) {
        $('#sortable').listview('refresh');
    });
});

$('#movility .column').sortable({  
    connectWith: '.column',  
    handle: 'h2',  
    cursor: 'move',  
    placeholder: 'placeholder',  
    forcePlaceholderSize: true,  
    opacity: 0.4,  
})  
.disableSelection()
.bind( "sortstop", function(event, ui) {
  $(this).listview('refresh');
});

$('#movility .dragbox').each(function(){  
    $(this).hover(function(){  
        $(this).find('h2').addClass('collapse');  
    }, function(){  
        $(this).find('h2').removeClass('collapse');  
    })  
    .find('h2').hover(function(){  
        $(this).find('.configure').css('visibility', 'visible');  
    }, function(){  
        $(this).find('.configure').css('visibility', 'hidden');  
    })  
    .click(function(){  
        $(this).siblings('.dragbox-content').toggle();  
    })  
    .end()  
    .find('.configure').css('visibility', 'hidden');  
});

// GOOGLE MAPS

var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };
            
////////////////////////////////////////////////////////////

$('#basic_map').live('pageinit', function() {
    demo.add('basic_map', function() {
        $('#map_canvas').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
            var self = this;
            self.addMarker({'position': this.get('map').getCenter() }).click(function() {
                self.openInfoWindow({ 'content': 'Hello World!' }, this);
            });
        }}); 
    }).load('basic_map');
});

$('#basic_map').live('pageshow', function() {
    demo.add('basic_map', function() { $('#map_canvas').gmap('refresh'); }).load('basic_map');
});

////////////////////////////////////////////////////////////

$('#directions_map').live('pageinit', function() {
    demo.add('directions_map', function() {
        $('#map_canvas_1').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
            var self = this;
            self.set('getCurrentPosition', function() {
                self.refresh();
                self.getCurrentPosition( function(position, status) {
                    if ( status === 'OK' ) {
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                        self.get('map').panTo(latlng);
                        self.search({ 'location': latlng }, function(results, status) {
                            if ( status === 'OK' ) {
                                $('#from').val(results[0].formatted_address);
                            }
                        });
                    } else {
                        alert('Unable to get current position');
                    }
                });
            });
            $('#submit').click(function() {
                self.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
                    ( status === 'OK' ) ? $('#results').show() : $('#results').hide();
                });
                return false;
            });
        }});
    }).load('directions_map');
});

$('#directions_map').live('pageshow', function() {
    demo.add('directions_map', $('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map');
});

////////////////////////////////////////////////////////////
                
$('#gps_map').live('pageinit', function() {
    demo.add('gps_map', function() {
        $('#map_canvas_2').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function(map) {
            var self = this;
            self.watchPosition(function(position, status) {
                if ( status === 'OK' ) {
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    if ( !self.get('markers').client ) {
                        self.addMarker({ 'id': 'client', 'position': latlng, 'bounds': true });
                    } else {
                        self.get('markers').client.setPosition(latlng);
                        map.panTo(latlng);
                    }
                }
            });
        }});
    }).load('gps_map');
});

$('#gps_map').live('pageshow', function() {
    demo.add('gps_map', function() { $('#map_canvas_2').gmap('refresh'); }).load('gps_map');
});

$('#gps_map').live("pagehide", function() {
    demo.add('gps_map', function() { $('#map_canvas_2').gmap('clearWatch'); }).load('gps_map');
});

////////////////////////////////////////////////////////////

$('#places').live('pageinit', function() {
    demo.add('places_1', function() {
        $('#map_canvas_3').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
            var self = this;
            var control = self.get('control', function() {
                $(self.el).append('<div id="control"><div><input id="places-search" class="ui-bar-d ui-input-text ui-body-null ui-corner-all ui-shadow-inset ui-body-d ui-autocomplete-input" type="text"/></div></div>');
                self.autocomplete($('#places-search')[0], function(ui) {
                    self.clear('markers');
                    self.set('bounds', null);
                    self.placesSearch({ 'location': ui.item.position, 'radius': '5000' }, function(results, status) {
                        if ( status === 'OK' ) {
                            $.each(results, function(i, item) {
                                self.addMarker({ 'id': item.id, 'position': item.geometry.location, 'bounds':true }).click(function() {
                                    self.openInfoWindow({'content': '<h4>'+item.name+'</h4>'}, this);
                                });
                            });
                        }
                    });
                });
                return $('#control')[0];
            });
            self.addControl(new control(), 1);
        }});
    }).load('places_1');
});

$('#places').live('pageshow', function() {
    demo.add('places_2', function() { $('#map_canvas_3').gmap('refresh'); }).load('places_2');
});





// BOOK

$("#shelve div.book").bind('tap', function(event){
    var bookTop = '0',
    bookHeight = '100px',
    bookWidth = '100px';
    if ($(this).hasClass('b1')) {
        bookTop = '-160px';
        bookHeight = '500px',
        bookWidth = '800px';
    };
    if ($(this).hasClass('b6')) {
        bookTop = '0';
        bookHeight = '752px',
        bookWidth = '1152px';  
    };
    $(this).css( 'z-index', 1 );
    $(this).animate({'z-index':'1', 'top':bookTop,'left':'0', 'height':bookHeight, 'width':bookWidth});
    event.stopPropagation();
    $(this).addClass('open');
    $("div.book.open .cover").show();
    $(window).bind('keydown', function(e){
        if (e.target && e.target.tagName.toLowerCase()!='input')
            if (e.keyCode==37)
                $('div.book.open').turn('previous');
            else if (e.keyCode==39)
                $('div.book.open').turn('next');
    });
    $('.ui-page-active div.ui-content').bind('tap',function(){
        var bookTop = '0',
        bookLeft = '0',
        bookHeight = '0',
        bookWidth = '0';
        if ($('div.book.open').hasClass('b1')) {
            bookTop = '0';
            bookLeft = '100px';
            bookHeight = '115px';
            bookWidth = '93px';
        };
        if ($('div.book.open').hasClass('b6')) {
            bookTop = '-10px';
            bookLeft = '250px'; 
            bookHeight = '125px';
            bookWidth = '105px';
        };
        $('div.book.open').animate({'top':bookTop,'left':bookLeft, 'height':bookHeight, 'width':bookWidth, 'z-index':'0'});
        $("div.book.open .cover").hide();
        $('div.book.open').removeClass('open');
        $(this).unbind('tap');
        $(window).unbind('keydown');
    });    
});

// b1

// Sample using dynamic pages with turn.js

var numberOfPages = 1000;


// Adds the pages that the book will need
function addPage(page, book) {
    // First check if the page is already in the book
    if (!book.turn('hasPage', page)) {
        // Create an element for this page
        var element = $('<div />', {'class': 'page '+((page%2==0) ? 'odd' : 'even'), 'id': 'page-'+page}).html('<i class="loader"></i>');
        // If not then add the page
        book.turn('addPage', element, page);
        // Let's assum that the data is comming from the server and the request takes 1s.
        setTimeout(function(){
            element.html('<div class="data">Data for page '+page+'</div>');
        }, 1000);
    }
}

$(document).bind('pageinit', function() {
    $('#book').bind('pageinit', function() {
        $('div.book.b1').turn({acceleration: true,
        pages: numberOfPages,
        elevation: 50,
        gradients: !$.isTouch,
        when: {
            turning: function(e, page, view) {

                // Gets the range of pages that the book needs right now
                var range = $(this).turn('range', page);

                // Check if each page is within the book
                for (page = range[0]; page<=range[1]; page++)
                addPage(page, $(this));

            },

            turned: function(e, page) {
                // $('#page-number').val(page);
            }
        }
        });

        // $('#number-pages').html(numberOfPages);

        // $('#page-number').keydown(function(e){
        //     if (e.keyCode==13)
        //     $('div.book.b1').turn('page', $('#page-number').val());
        // });
    });

    // b6



});
