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
var zoomablePagesIDs = ["zoom", "zoom2", "charts","book"];
var zoomablePageMeta =  "initial-scale=1, maximum-scale=10.0, minimum-scale=1.0,  user-scalable=1"; 
var fixedPageMeta =     "initial-scale=1, maximum-scale=1.0, maximum-scale=1.0,  user-scalable=no";

$('[data-role=page]').live('pagebeforeshow', function() {
    var curPageID = $(this).attr('id');
    var curMeta = $('#viewportMeta').attr("content");
    if ( $.inArray(curPageID, zoomablePagesIDs) != -1 ) {
        $('#viewport').attr("content", zoomablePageMeta);
        $(this).page().trigger('create');
    } else if ( ($.inArray(curPageID, zoomablePagesIDs) == -1) && (curMeta != fixedPageMeta) ) {
        $('#viewport').attr("content", fixedPageMeta);
        $(this).page().trigger('create');
    }
});

$(window).resize(function() { 
    $(".ui-header").width($(window).width());
});

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

$(function(){
    // bind change event to select
    $('select.mainSelect').bind('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            $.mobile.changePage( url, { transition: "slide"} );
        }
        return false;
    });
});

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

$(document).delegate('#gestures', 'pageshow', function () {
    if(window.innerHeight > window.innerWidth){
        $("#horientation").text("Portrait");
    }else{
        $("#horientation").text("Landscape");
    };
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

var mobileDemo = { 'center': '9.922860,-84.045822', 'zoom': 10 };
            
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

// Charts

$(document).delegate('#chart1', 'pageshow', function () {
    $.jqplot.config.enablePlugins = true;
    var s1 = [2, 6, 7, 10];
    var ticks = ['a', 'b', 'c', 'd'];
     
    plot1 = $.jqplot('barChart', [s1], {
        // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
        animate: !$.jqplot.use_excanvas,
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            pointLabels: { show: true }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            }
        },
        highlighter: { show: false }
    });
 
    $('#barChart').bind('jqplotDataClick', 
        function (ev, seriesIndex, pointIndex, data) {
            $('#barChartInfo').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
        }
    );
}); 

var dinamicPlot1;
$(document).delegate('#chart2', 'pageshow', function () {
    var data = [
    ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
    ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
    ];
    dinamicPlot1 = jQuery.jqplot ('pieChart1', [data], 
        { 
          seriesDefaults: {
            // Make this a pie chart.
            renderer: jQuery.jqplot.PieRenderer, 
            rendererOptions: {
              // Put data labels on the pie slices.
              // By default, labels show the percentage of the slice.
              showDataLabels: true
            }
          }, 
          legend: { show:true, location: 'e' }
        }
    );

    $('#chart2 input').change(function(){

    });

    $('#chart2 #refresh').click(function(){
        $('#pieChart1').empty();
        var data = [
        ['Heavy Industry', parseInt($('#slider-1').val())],['Retail', parseInt($('#slider-2').val())], ['Light Industry', parseInt($('#slider-3').val())], 
        ['Out of home', parseInt($('#slider-4').val())],['Commuting', parseInt($('#slider-5').val())], ['Orientation', parseInt($('#slider-6').val())]
        ];

        dinamicPlot1 = jQuery.jqplot ('pieChart1', [data], 
            { 
              seriesDefaults: {
                // Make this a pie chart.
                renderer: jQuery.jqplot.PieRenderer, 
                rendererOptions: {
                  // Put data labels on the pie slices.
                  // By default, labels show the percentage of the slice.
                  showDataLabels: true
                }
              }, 
              legend: { show:true, location: 'e' }
            }
        );
    });
});
$(document).delegate('#chart3', 'pageshow', function () {
    var l6 = [11, 9, 5, 12, 14, 8, 7, 9, 6, 11, 9, 3, 4];
    var l7 = [4, 8, 5, 3, 6, 5, 3, 2, 6, 7, 4, 3, 2];
    var l8 = [12, 6, 13, 11, 2, 3, 4, 2, 1, 5, 7, 4, 8];
 
    var ticks = [[1,'Dec 10'], [2,'Jan 11'], [3,'Feb 11'], [4,'Mar 11'], [5,'Apr 11'], [6,'May 11'], [7,'Jun 11'], [8,'Jul 11'], [9,'Aug 11'], [10,'Sep 11'], [11,'Oct 11'], [12,'Nov 11'], [13,'Dec 11']]; 
 
     
    plot2 = $.jqplot('areaChart2',[l6, l7, l8],{
       stackSeries: true,
       showMarker: false,
       highlighter: {
        show: true,
        showTooltip: false
       },
       seriesDefaults: {
           fill: true,
       },
       series: [
        {label: 'Beans'},
        {label: 'Oranges'},
        {label: 'Crackers'}
       ],
       legend: {
        show: true,
        placement: 'outsideGrid'
       },
       grid: {
        drawBorder: false,
        shadow: false
       },
       axes: {
           xaxis: {
              ticks: ticks,
              tickRenderer: $.jqplot.CanvasAxisTickRenderer,
              tickOptions: {
                angle: -90
              },
              drawMajorGridlines: false
          }          
        }
    });
     
    // capture the highlighters highlight event and show a custom tooltip.
    $('#areaChart2').bind('jqplotHighlighterHighlight',
        function (ev, seriesIndex, pointIndex, data, plot) {
            // create some content for the tooltip.  Here we want the label of the tick,
            // which is not supplied to the highlighters standard tooltip.
            var content = plot.series[seriesIndex].label + ', ' + plot.series[seriesIndex]._xaxis.ticks[pointIndex][1] + ', ' + data[1];
            // get a handle on our custom tooltip element, which was previously created
            // and styled.  Be sure it is initiallly hidden!
            var elem = $('#customTooltipDiv');
            elem.html(content);
            // Figure out where to position the tooltip.
            var h = elem.outerHeight();
            var w = elem.outerWidth();
            var left = ev.pageX - w - 10;
            var top = ev.pageY - h - 10;
            // now stop any currently running animation, position the tooltip, and fade in.
            elem.stop(true, true).css({left:left, top:top}).fadeIn(200);
        }
    );
     
    // Hide the tooltip when unhighliting.
    $('#areaChart2').bind('jqplotHighlighterUnhighlight',
        function (ev) {
            $('#customTooltipDiv').fadeOut(300);
        }
    );
});
$(document).delegate('#chart4', 'pageshow', function () {
    var s1 = [[2002, 112000], [2003, 122000], [2004, 104000], [2005, 99000], [2006, 121000],
    [2007, 148000], [2008, 114000], [2009, 133000], [2010, 161000], [2011, 173000]];
    var s2 = [[2002, 10200], [2003, 10800], [2004, 11200], [2005, 11800], [2006, 12400],
    [2007, 12800], [2008, 13200], [2009, 12600], [2010, 13100]];
 
    plot1 = $.jqplot("plotChart1", [s2, s1], {
        // Turns on animatino for all series in this plot.
        animate: true,
        // Will animate plot on calls to plot1.replot({resetAxes:true})
        animateReplot: true,
        cursor: {
            show: true,
            zoom: true,
            looseZoom: true,
            showTooltip: false
        },
        series:[
            {
                pointLabels: {
                    show: true
                },
                renderer: $.jqplot.BarRenderer,
                showHighlight: false,
                yaxis: 'y2axis',
                rendererOptions: {
                    // Speed up the animation a little bit.
                    // This is a number of milliseconds. 
                    // Default for bar series is 3000. 
                    animation: {
                        speed: 2500
                    },
                    barWidth: 15,
                    barPadding: -15,
                    barMargin: 0,
                    highlightMouseOver: false
                }
            },
            {
                rendererOptions: {
                    // speed up the animation a little bit.
                    // This is a number of milliseconds.
                    // Default for a line series is 2500.
                    animation: {
                        speed: 2000
                    }
                }
            }
        ],
        axesDefaults: {
            pad: 0
        },
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
                tickInterval: 1,
                drawMajorGridlines: false,
                drawMinorGridlines: true,
                drawMajorTickMarks: false,
                rendererOptions: {
                tickInset: 0.5,
                minorTicks: 1
            }
            },
            yaxis: {
                tickOptions: {
                    formatString: "$%'d"
                },
                rendererOptions: {
                    forceTickAt0: true
                }
            },
            y2axis: {
                tickOptions: {
                    formatString: "$%'d"
                },
                rendererOptions: {
                    // align the ticks on the y2 axis with the y axis.
                    alignTicks: true,
                    forceTickAt0: true
                }
            }
        },
        highlighter: {
            show: true,
            showLabel: true,
            tooltipAxes: 'y',
            sizeAdjust: 7.5 , tooltipLocation : 'ne'
        }
    });
});

// BOOK

$("#shelve div.book").bind('tap', function(event){
    if(window.innerHeight > window.innerWidth){
        event.preventDefault();
        $( "#popupFlip" ).popup( "open" );
    };
});

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

// Security
var dt = {};
var day = "";
var hour = "";
var keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

$(document).delegate('#security', 'pageshow', function () {
    $("#security #enter").click(tryPassword);
    reCalculate();
});

function reCalculate(){
    dt = new Date();
    day = ('0' + dt.getDate()).slice(-2);
    hour = ('0' + dt.getHours()).slice(-2);
    $('#security #day').text(day);
    $('#security #hour').text(hour);
    $('#security #passwordRevealed').text(toChars(day + hour));

    setTimeout("reCalculate()",5000);
};

function toChars(number){
    chars = "";
    for (var i = 0, len = number.length; i < len; i++) {
      chars += keys[number[i]];
    };
    return chars;
}

function tryPassword(){
    if ($('#security #key').val().toUpperCase() == toChars(day + hour).toUpperCase()) {
        $('#security #result').text("Contraseña correcta! :)");
        $('#security #result').css('color', 'green');
    }else{
        $('#security #result').text("Contraseña incorrecta! :(");
        $('#security #result').css('color', 'red');
    };
}

// Internet

$(document).delegate('#internet', 'pageshow', function () {
    $.getJSON('https://graph.facebook.com/cocacola', function(data) {
        $('#internet #facebook').text(JSON.stringify(data));
    });
});

// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// Database
var db = {};
$(document).delegate('#dataBase', 'pageshow', function () {
    db = window.openDatabase("Database", "1.0", "iPadDemo", 200000);
    db.transaction(populateDB, errorCB, successCB);
    $('#save').click(function(){
        db.transaction(saveDB, errorCB, successCB);
    });
    $('#delete').click(function(){
        db.transaction(deleteDB, errorCB, successCB); 
    });
});
// Populate the database 
//
function populateDB(tx) {
    // tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, name, phone)');
    // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function saveDB(tx) {
    tx.executeSql('INSERT INTO DEMO (id, name, phone) VALUES ('+ $('#id').val() +', "'+ $('#uname').val() +'", "'+ $('#phone').val() +'")');
    // alert('INSERT INTO DEMO (id, name, phone) VALUES ('+ $('#id').val() +', "'+ $('#uname').val() +'", "'+ $('#phone').val() +'")');
}

function deleteDB(tx) {
    tx.executeSql('DELETE FROM DEMO');
    $("#results div.ui-grid-b").html('<div class="ui-block-a"><strong>Id</strong></div><div class="ui-block-b"><strong>Nombre</strong></div><div class="ui-block-c"><strong>Teléfono</strong></div>');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    var len = results.rows.length;
    $("#error").text("Tabla DEMO: " + len + " filas existntes.");
    $("#results div.ui-grid-b").html('<div class="ui-block-a"><strong>Id</strong></div><div class="ui-block-b"><strong>Nombre</strong></div><div class="ui-block-c"><strong>Teléfono</strong></div>');
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Name =  " + results.rows.item(i).name);
        $("#results div.ui-grid-b div:last-child").after('<div class="ui-block-a">'+ results.rows.item(i).id +'</div><div class="ui-block-b">'+ results.rows.item(i).name +'</div><div class="ui-block-c">'+ results.rows.item(i).phone +'</div>');
    }
}

// Transaction error callback
//
function errorCB(err) {
    $("#error").text("Error procesando el SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
    db = window.openDatabase("Database", "1.0", "iPadDemo", 200000);
    db.transaction(queryDB, errorCB);
}


