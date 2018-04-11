"use strict"

class GamesView {
	constructor(model) {
		let self = this;
		model.subscribe( function(a,b) {
			self.redrawMap(a,b)
		})
	}

	redrawMap(gamesList, msg){
		let pacific = ["CA", "AZ", "WA"]
		let mountain = ["CO"]
		let central = ["MN", "WI", "IL", "MO", "TX", "KS"]

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

	    let gameArray = gamesList.getGames()
	    
	    for (let game of gameArray) {
	    	let dict = {
			    lat: game.lat,
			    lng: game.lng
			};
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
		    		let weatherDate = gameArray[i].date.replace(/-/g, '')
		    		let easternTime = gameArray[i].time
		        	let localTime = timeZone(easternTime, weatherDate, gameArray[i].state)
		        	let localTimeHours = localTime.getHours()

		        	let contentString = '<div id="infoWindow">' +
		        	'<h2><a href="https://en.wikipedia.org/wiki/'+ gameArray[i].stadium.replace(' ', '_') + 
		        	'" target="_blank">' + gameArray[i].stadium + '</a></h2>' 
		        	

		        	if (gameArray[i].final) {
		        		console.log("history")
			        	fetch("http://api.wunderground.com/api/9cf4b72704b2efcc/history_" + weatherDate + "/q/" + gameArray[i].state + "/" + weatherCity + ".json")
						.then(function(response) {
								return response.json()
						})
						.then(function(data){
							console.log(data)
							let len = data.history.observations.length
							let weatherHour = Math.round((localTimeHours / 24) * len)
							let obs = data.history.observations[weatherHour]
							let temp = obs.tempi
							let conditions = obs.conds
							let humidity = obs.hum
							let windSpeed = obs.wspdi

		            		contentString += '<h3>' + gameArray[i].city + ', ' + gameArray[i].state + "    " + 
		            		 localTime.toLocaleString() + '</h3>' +
		            		'<p id="gameScoreOutput">' + gameArray[i].homeTeam + ' <b>[' + gameArray[i].homeScore + 
		            		']</b> - ' + gameArray[i].awayTeam + ' <b>[' + gameArray[i].awayScore + ']</b></p></div>' + 
		            		'<p> Temp: ' + temp + "&#8457</p><p>Wind Speed: " + windSpeed + " mph</p><p>Conditions: " + conditions
		            		+ "</p><p>Humidity: " + humidity + "%</p></div>"

		            		infowindow.setContent(contentString);
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
								infowindow.setContent(contentString);
			            		infowindow.open(map, marker);
						})
		        	}
		        }
		    })(marker, i));
		    markers.push(marker)
        }
	 
		function timeZone(easternTime, date, state) {
			let year = date.substring(0,4)
			let month = parseInt(date.substring(4,6)) - 1
			console.log(month)
			let day = date.substring(6,8)
			let hours = parseInt(easternTime.split(':')[0]) + 12
			console.log(hours)
			let minutes = easternTime.split(':')[1].substring(0,2)
			easternTime = new Date(year, month, day, hours, minutes, 0, 0)
			let localTime = easternTime
			for (let st of pacific) {
				if (state == st) {
					//console.log("pacific")
					let localTime = easternTime.setHours(easternTime.getHours() - 3)
				}
			}
			for (let st of mountain) {
				if (state == st) {
					//console.log("mountain")
					let localTime = easternTime.setHours(easternTime.getHours() - 2)
				}
			}
			for (let st of central) {
				if (state == st) {
					//console.log("central")
					let localTime = easternTime.setHours(easternTime.getHours() - 1)
				}
			}
			return localTime
		}

	}


}
