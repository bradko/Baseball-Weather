"use strict"

var list = new GamesList()
var view = new GamesView(list)

function clickedon() {	
	list.clearGames()

	let date = document.querySelector("#calendar")
	let sel = document.querySelector("#selectedDate")
	sel.innerHTML = "Date Selected: " + date.value
	let year = date.value.substring(0,4)
	let month = date.value.substring(5,7)
	let day = date.value.substring(8,10)
	let theDate = year+month+day

	dateObj =  new Date();
	let y = dateObj.getFullYear();
	let m = dateObj.getMonth() + 1;
	let d = dateObj.getDate();
	if (m > 0 && m < 10) {
		m = "0" + m
	}
	if (d > 0 && d < 10) {
		d = "0" + d
	}
	let todaysDate = y + m + d

	if (theDate != todaysDate) {
		$.ajax
		({
		  type: "GET",
		  url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/" + year + "-regular/scoreboard.json?fordate=" + theDate,
		  dataType: 'json',
		  async: false,
		  headers: {
		    "Authorization": "Basic " + btoa("uetzau" + ":" + "Baseball1")
		  },
		  success: function(result) {
		  	console.log(result)
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
					let address = data.results[0].formatted_address
					let city = address.split(',')[1].replace(' ', '')
					let state = address.split(',')[2].substring(1,3)
					if (state == "ON") {
						state = "Canada"
					}
					let game = new Game(homeTeam, awayTeam, g.game.date, g.game.time, g.game.location, g.homeScore, g.awayScore, g.isCompleted, lat, lng, city, state)
					list.addGame(game)
					counter += 1
				})
		    }
		    setTimeout(function(){
			    if (counter == len) {
			    	console.log("got the games")
			    	list.publishGames()
			    }
			    else {
			    	alert("error getting games, please try again")
			    }
			}, 1000)	
		  }  
		})
	}
	else {
		$.ajax
		({
		  type: "GET",
		  url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/" + year + "-regular/daily_game_schedule.json?fordate=" + theDate,
		  dataType: 'json',
		  async: false,
		  headers: {
		    "Authorization": "Basic " + btoa("uetzau" + ":" + "Baseball1")
		  },
		  success: function(result) {
		  	console.log(result)
		    let games = result.dailygameschedule.gameentry
		    let len = games.length
		    let counter = 0
		    for (let g of games){
		    	let homeTeam = g.homeTeam.City + " " + g.homeTeam.Name
		    	let awayTeam = g.awayTeam.City + " " + g.awayTeam.Name
				fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + g.location + "&key=AIzaSyCSFn1R3yBkcTblrNwxCnZNAoMWPJq_xSU")
				.then(function(response) {
					return response.json()
				})
				.then(function(data){
					let lat = data.results[0].geometry.location.lat
					let lng = data.results[0].geometry.location.lng
					let address = data.results[0].formatted_address
					let city = address.split(',')[1].replace(' ', '')
					let state = address.split(',')[2].substring(1,3)
					let game = new Game(homeTeam, awayTeam, g.date, g.time, g.location, 0, 0, false, lat, lng, city, state)
					list.addGame(game)
					counter += 1
				})
		    }
		    setTimeout(function(){
			    if (counter == len) {
			    	console.log("got the games")
			    	list.publishGames()
			    }
			    else {
			    	alert("error getting games, please try again")
			    }
			}, 1000)	
		  }  
		})
	}
}
