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
	let final = "2017"+month+day

	$.ajax
	({
	  type: "GET",
	  url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/2017-regular/daily_game_schedule.json?fordate=" + final,
	  dataType: 'json',
	  async: false,
	  headers: {
	    "Authorization": "Basic " + btoa("uetzau" + ":" + "Baseball1")
	  },
	  success: function(result) {
	    let games = result.dailygameschedule.gameentry
	    for (let g of games){
	    	let homeTeam = g.homeTeam.City + " " + g.homeTeam.Name
	    	let awayTeam = g.awayTeam.City + " " + g.awayTeam.Name
	    	let game = new Game(homeTeam, awayTeam, g.date, g.time, g.location)
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
