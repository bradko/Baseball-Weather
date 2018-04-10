"use strict"

class GamesView {
	constructor(model) {
		// this.model = model
		// model.subscribe(this.redrawTable.bind(this))

		let self = this;
		model.subscribe( function(a,b) {
			self.redrawMap(a,b)
		})
	}

	redrawMap(gamesList, msg){
		let todaysDate =  new Date();
		let selectedDate = new Date(document.querySelector("#calendar").value)

        let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let infowindow = new google.maps.InfoWindow();
		let marker, i;
		
		function clearOverlays() {
		    for (var i = 0; i < markers.length; i++ ) {
		        markers[i].setMap(null);
		    }
		    markers.length = 0;
		}

		clearOverlays()
		locations = []
		// let locations = [
	 //        {lat: 40.8296, lng: -73.9262},
	 //        {lat: 42.3467, lng: -71.0972},
	 //        {lat: 44.9818, lng: -93.2775}
	 //    ]

	    let gameArray = gamesList.getGames()
	    
	    for (let game of gameArray) {
	    	let dict = {
			    lat: game.lat,
			    lng: game.lng
			};
			console.log(dict)
			locations.push(dict)
	    }

        for (let i = 0; i < locations.length; i++) {
        	let marker = new google.maps.Marker({
        		position: locations[i],
        		label: labels[i % labels.length],
        		map: map
        	});
        	
        	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		        return function() {
		    		let weatherCity = gameArray[i].city.replace(' ','_')
		        	
		        	if (selectedDate.getDate() + 1 < todaysDate.getDate()) {
		        		console.log("history")
		        		let weatherDate = gameArray[i].date.replace(/-/g, '')
			        	fetch("http://api.wunderground.com/api/9cf4b72704b2efcc/history_" + weatherDate + "/q/" + gameArray[i].state + "/" + weatherCity + ".json")
						.then(function(response) {
								return response.json()
						})
						.then(function(data){
								console.log(data)
								infowindow.setContent(gameArray[i].homeTeam + " vs. " + gameArray[i].awayTeam);
			            		infowindow.open(map, marker);
						})
		        	}
		        	else {
		        		console.log("forecast")
			        	fetch("http://api.wunderground.com/api/9cf4b72704b2efcc/hourly10day/q/" + gameArray[i].state + "/" + weatherCity + ".json")
						.then(function(response) {
								return response.json()
						})
						.then(function(data){
								console.log(data)
								infowindow.setContent(gameArray[i].homeTeam + " vs. " + gameArray[i].awayTeam);
			            		infowindow.open(map, marker);
						})
		        	}
		        }
		    })(marker, i));
		    markers.push(marker)
        }
	 
    	//let key = 9cf4b72704b2efcc
	}
}
