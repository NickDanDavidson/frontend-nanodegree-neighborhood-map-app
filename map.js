(function() {

"use strict";

// Location object is part of Model and contains variables that are accessible
// by the KO MVVM, the Google Maps API, and the jQuery autocomplete functionality.
var Location = function(data) {
	this.name = ko.observable(data.name);
	this.img = ko.observable(data.img);
	this.url = ko.observable(data.url);
	// These are to be used outside the KO MVVM
	this.usableName = data.name;
	this.usableImg = data.img;
	this.usableURL = data.url;
	this.usableDescription = data.description;
};

// The initial locations to use in the map and list view - part of Model
var initialLocations = [
	{
		name: "Anytime Fitness, Clifton Blvd., Cleveland",
		img: "http://anytimefitness.blob.core.windows.net/club-images-new/Image1_1606.JPG",
		url: "http://www.anytimefitness.com/gyms/1449/Cleveland-OH-44102",
		description: "Anytime Fitness is a 24-hour fitness facility."
	},
	{
		name: "Clifton Martini & Wine Bar",
		img: "http://coolcleveland.com/wp-content/uploads/2013/08/cmw.jpg",
		url: "http://www.cliftonmartini.com",
		description: "If you're looking for a nice place to dress up and take your friends" +
					 " (or a date), Clifton Martini & Wine Bar is a superb option."
	},
	{
		name: "Constantino's Market, Clifton",
		img: "http://constantinosmarket.com/wp-content/uploads/2015/04/ConstantinosLogo2cl.jpg",
		url: "http://www.constantinosmarket.com",
		description: "Constantino's Market is your quick one-stop shop if you need to pick up" +
					 " any last-minute food or drinks for a party."
	},
	{
		name: "Diner on Clifton, Cleveland",
		img: "http://www.dineronclifton.com/images/anim.gif",
		url: "http://www.dineronclifton.com",
		description: "The Diner on Clifton is a great little diner serving up consistent" +
					 " food and service quality."
	},
	{
		name: "Edgewater Park, Cleveland",
		img: "http://www.medinacountyroadrunners.com/images/nc24.jpg",
		url: "http://www.clevelandmetroparks.com/Main/Aquatics1/Edgewater-Beach-2.aspx",
		description: "Part of the Cleveland Metroparks system, Edgewater Park is a great" +
					 " place to take your family to bike, walk, grill, sit and listen to" +
					 " music, or play on the beach."
	},
	{
		name: "Liquid Planet, Clifton Blvd., Cleveland",
		img: "data:image/jpeg;base64,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",
		url: "http://www.liquid-planet.com/LP/main.asp",
		description: "Liquid Planet offers up a huge menu of cool smoothies plus healthy meals."
	},
	{
		name: "Starbucks, Clifton Blvd.",
		img: "http://x.lnimg.com/xnet/mainsite/HttpHandlers/attachment/ServeAttachment.ashx?FileGuid=9c67e2fb85944efc83160d8c5c6d934c&Extension=jpg&Width=0&Height=0",
		url: "http://www.starbucks.com/store/18386/us/clifton-blvd-/11501-clifton-boulevard-cleveland-oh-441021317",
		description: "Your local Starbucks is right here if you need a quick caffeine fix."
	},
	{
		name: "Twist Social Club",
		img: "http://imgick.cleveland.com/home/cleve-media/width620/img/ent_impact_home/photo/15565441-mmmain.jpg",
		url: "http://www.twistsc.com",
		description: "Twist is a popular hangout for the LGBT community."
	}
];

// This is where most of the functionality is written
var ViewModel = function() {
	var self = this;

	self.placeList = ko.observableArray();

	initialLocations.forEach(function(place) {
		self.placeList.push(new Location(place));
	});

	// Current place keeps track of which place is active for opening and closing Google Map
	// info windows
	self.currentPlace = ko.observable();

	self.changePlace = function(clickedPlace) {
		self.currentPlace(clickedPlace);
	};

	// Logic to toggle info window - is called when user clicks on list items and search results
	self.toggleInfoWindow = function(place) {
		var currentIndex = self.placeList.indexOf(self.currentPlace());
		self.changePlace(place);
		var newIndex = self.placeList.indexOf(place);

		var currentMarker = markers[currentIndex];
		var currentInfoWindow = infoWindows[currentIndex];

		var newMarker = markers[newIndex];
		var newInfoWindow = infoWindows[newIndex];

		if (currentIndex !== newIndex) {
			if (currentIndex >= 0) {
				currentInfoWindow.close();
				newInfoWindow.open(map, newMarker);
				openStatus[newIndex] = true;
			} else {
				newInfoWindow.open(map, newMarker);
				openStatus[newIndex] = true;
			}
		} else {
			if (openStatus[newIndex] === true) {
				currentInfoWindow.close();
				openStatus[newIndex] = false;
			} else if (openStatus[newIndex] === false) {
				newInfoWindow.open(map, newMarker);
				openStatus[newIndex] = true;
			}
		}
	};

	self.closeListView = function() {
		placeMenu.classList.remove('shown');
		menu.innerHTML = '☰';
	};

	self.handleClick = function(place) {
		if (placeMenu.classList.length > 1) {
			self.closeListView();
			self.toggleInfoWindow(place);
		} else {
			self.toggleInfoWindow(place);
		}
	};
};

// Name the view model so that I can access it outside of KO context
var myViewModel = { VM: new ViewModel() };

ko.applyBindings(myViewModel.VM);

var map,
	markers = [],
	infoWindows = [],
	openStatus = [];

// Map's initial functionality adapted from the Interactive Resume map
// Additional functionality includes logic for toggling info windows
window.initializeMap = function () {

	var mapOptions = {
		center: new google.maps.LatLng(41.486106, -81.760991),
		zoom: 15
	};

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	function locationFinder() {

		var locations = [];

		myViewModel.VM.placeList().forEach(function(place) {
			locations.push(place.usableName);
		});

		return locations;
	}

	function createMapMarker(placeData, thisIndex) {

		var lat = placeData.geometry.location.lat(),
			lon = placeData.geometry.location.lng(),
			name = placeData.formatted_address,
			bounds = window.mapBounds,
			image = placeData.icon;

		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: name,
			icon: new google.maps.MarkerImage(
				image,
				null,
				null,
				null,
				new google.maps.Size(30, 30)
			)
		});

		markers.push(marker);

		// thisPlace attaches current marker to info window and marker event listeners
		var thisPlace = myViewModel.VM.placeList()[thisIndex];

		var contentHTML = '<div class="info-content"><h3>' + thisPlace.usableName + '</h3>' +
						  '<div class="info-description"><img src="' + thisPlace.usableImg + 
						  '" width="78.125px" height="50px">' + '<a href="' + thisPlace.usableURL + 
						  '">' + thisPlace.usableURL + '</a><p>' + thisPlace.usableDescription + 
						  '</p></div>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentHTML
		});

		infoWindows.push(infoWindow);

		// Set initial open states of each marker to false
		var opened = false;
		openStatus.push(opened);

		google.maps.event.addListener(marker, 'click', function(e) {
			if (openStatus[thisIndex] === true) {
				infoWindow.close();
			}
			if (openStatus[thisIndex] === false) {
				infoWindow.open(map, marker);
			}
			// Close any open info windows
			for (var i = 0; i < 9; i++) {
				if (i === thisIndex) {
					continue;
				}
				if (openStatus[i] === true) {
					infoWindows[i].close();
					openStatus[i] = false;
				}
			}

			openStatus[thisIndex] = !openStatus[thisIndex];

			myViewModel.VM.changePlace(myViewModel.VM.placeList()[thisIndex]);
		});

		google.maps.event.addListener(infoWindow, 'closeclick', function() {
			openStatus[thisIndex] = false;
		});

	}

	// Index to pass to createMapMarker to attach marker to thisPlace
	var index = 0;

	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0], index);
			index++;
		}
	}

	function pinPoster(locations) {

		var service = new google.maps.places.PlacesService(map),
			length = locations.length;

		for (var i = 0; i < length; i++) {

			var request = {
				query: locations[i]
			};

			service.textSearch(request, callback);
		}
	}

	var locations = locationFinder();

	pinPoster(locations);

}

function loadMap() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initializeMap&libraries=places';
	document.body.appendChild(script);
}

function loadWikiArticles() {

    var wikiElem = document.getElementById('articles'),
    	neighborhoods = ['Ohio City, Cleveland', 'Tremont, Cleveland', 'Old Brooklyn',
    					 'Lakewood, Ohio', 'Rocky River, Ohio', 'Bay Village, Ohio',
    					 'Kamm\'s Corners', 'Westlake Ohio'],
    	length = neighborhoods.length,
    	errors = 0;

    // Load Wikipedia entries

    for (var i = 0; i < length - 1; i++) {

	    $.ajax('http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + 
	    	   neighborhoods[i], {
	        dataType: "jsonp",
	        success: function(response) {
				var wikiArticle = document.createElement('article'),
		        	titleDiv = document.createElement('p'),
		        	snippetDiv = document.createElement('p'),
		        	linkDiv = document.createElement('p'),
		        	divider = document.createElement('hr'),
		        	title = response[1][0],
		        	snippet = response[2][0],
		        	link = 'Read more at <a href="' + response[3][0] + '">' + response[3][0] + '.';

		        titleDiv.className = 'wiki-title';
		        snippetDiv.className = 'wiki-snippet';
		        linkDiv.className = 'wiki-link';

		        titleDiv.innerHTML = title;
		        snippetDiv.innerHTML = snippet;
		        linkDiv.innerHTML = link;

		        wikiElem.appendChild(wikiArticle);
		        wikiArticle.appendChild(titleDiv);
		        wikiArticle.appendChild(snippetDiv);
		        wikiArticle.appendChild(linkDiv);
		        wikiArticle.appendChild(divider);
	        },
	        error: function(error) {
	        	errors++;
	        	if (errors === length - 1) {
			    	var emptyArticle = document.createElement('article');
			    	emptyArticle.className = 'wiki-error';
			    	emptyArticle.innerHTML = ('I\'m sorry. The Wikipedia entries failed to load. Please try' +
			    							  ' again later.');
			    	wikiElem.appendChild(emptyArticle);
	        	}
	        }
    	});
    }
}

var menu = document.getElementsByClassName('hamburger-menu')[0],
	placeMenu = document.getElementsByClassName('places')[0];

function toggleListView() {
	if (placeMenu.classList.length > 1) {
		placeMenu.classList.remove('shown');
		menu.innerHTML = '☰';
	} else {
		placeMenu.classList.add('shown');
		menu.innerHTML = 'x';
	}
}

window.addEventListener('load', loadMap);
window.addEventListener('load', loadWikiArticles);
menu.addEventListener('click', toggleListView);

// names stores place names for use in autocomplete
var names = [];
myViewModel.VM.placeList().forEach(function(place) {
	names.push(place.usableName);
});

// Autocomplete functionality - I think in the future I would implement a solution
// using KO, but I couldn't find too much help, and the help pointed to creating
// my own solution from scratch
$('#autocomplete').autocomplete({source: names});
// Determine if the key pressed is "enter," and if so, toggle info window
$('#autocomplete').keypress(function(e) {
	if (e.which == 13) {
		var thisPlace;
		for (var place in myViewModel.VM.placeList()) {
			if (this.value === myViewModel.VM.placeList()[place].usableName) {
				thisPlace = myViewModel.VM.placeList()[place];
			}
		}

		myViewModel.VM.toggleInfoWindow(thisPlace);
		if (placeMenu.classList.length > 1) {
			myViewModel.VM.closeListView();
		}
	}
});

}());