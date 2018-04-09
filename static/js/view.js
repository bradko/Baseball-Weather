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
        	markers.push(marker)

        }
	    
	}

}
