"use strict"

var list = new GamesList()
var view = new GamesView(list)

function clickedon() {
	let date = document.querySelector("#calendar")
	let sel = document.querySelector("#selectedDate")
	sel.innerHTML = "Date Selected: " + date.value
	let year = date.value.substring(0,4)
	let month = date.value.substring(5,7)
	let day = date.value.substring(8,10)
	let theDate = "2017"+month+day

	list = new GamesList()
	view = new GamesView(list)

	$.ajax
	({
	  type: "GET",
	  url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/2017-regular/scoreboard.json?fordate=" + theDate,
	  dataType: 'json',
	  async: false,
	  headers: {
	    "Authorization": "Basic " + btoa("uetzau" + ":" + "Baseball1")
	  },
	  success: function(result) {
	    let games = result.scoreboard.gameScore
	    let len = games.length
	    let counter = 0
	    for (let g of games){
	    	let homeTeam = g.game.homeTeam.City + " " + g.game.homeTeam.Name
	    	let awayTeam = g.game.awayTeam.City + " " + g.game.awayTeam.Name
			fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + g.game.location + "&key=AIzaSyCSFn1R3yBkcTblrNwxCnZNAoMWPJq_xSU")
			.then(function(response) {
				return response.json()
			})
			.then(function(data){
				let lat = data.results[0].geometry.location.lat
				let lng = data.results[0].geometry.location.lng
				let game = new Game(homeTeam, awayTeam, g.game.date, g.game.time, g.game.location, g.homeScore, g.awayScore, g.game.isCompleted, lat, lng)
				list.addGame(game)
				counter += 1
			})
	    }
	    setTimeout(function(){
		    if (counter == len) {
		    	console.log("got the games")
		    	list.publishGames()
		    }
		}, 1000)	
	  }  
	});

	//let key = 9cf4b72704b2efcc
	//fetch("http://api.wunderground.com/api/9cf4b72704b2efcc/hourly10day/q/IA/Decorah.json")
	//.then(function(response) {
	//	return response.json()
	//})
	//.then(function(data){
	//	console.log(data)
	//})

}
