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
	let scores = {}

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
	    for (let g of games){
			scores[g.game.ID] = [g.awayScore, g.homeScore, g.isCompleted]
	    }
	    console.log("got the scores")
	  }
	});

	$.ajax
	({
	  type: "GET",
	  url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/2017-regular/daily_game_schedule.json?fordate=" + theDate,
	  dataType: 'json',
	  async: false,
	  headers: {
	    "Authorization": "Basic " + btoa("uetzau" + ":" + "Baseball1")
	  },
	  success: function(result) {
	    let games = result.dailygameschedule.gameentry
	    for (let g of games){
	    	let awayScore = scores[g.id][0]
	    	let homeScore = scores[g.id][1]
	    	let final = scores[g.id][2]
	    	let homeTeam = g.homeTeam.City + " " + g.homeTeam.Name
	    	let awayTeam = g.awayTeam.City + " " + g.awayTeam.Name
	    	let game = new Game(homeTeam, awayTeam, g.date, g.time, g.location, homeScore, awayScore, final)
	    	list.addGame(game)
	    }
	    console.log("got the games")
	  }
	});

	let dailyGames = list.getGames()

	//let key = 9cf4b72704b2efcc
	//fetch("http://api.wunderground.com/api/9cf4b72704b2efcc/hourly10day/q/IA/Decorah.json")
	//.then(function(response) {
	//	return response.json()
	//})
	//.then(function(data){
	//	console.log(data)
	//})

}
