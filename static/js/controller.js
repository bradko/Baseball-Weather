"use strict"

var list = new gamesList()
var view = new gamesView(list)

function clickedon() {
	let date = document.querySelector("#calendar")
	let sel = document.querySelector("#selectedDate")
	sel.innerHTML = "Date Selected: " + date.value
	let year = date.value.substring(0,4)
	let month = date.value.substring(5,7)
	let day = date.value.substring(8,10)
	let final = year+month+day

	$.ajax
	({
	  type: "GET",
	  url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/2017-regular/full_game_schedule.json",
	  dataType: 'json',
	  async: false,
	  headers: {
	    "Authorization": "Basic " + btoa("uetzau" + ":" + "Baseball1")
	  },
	  success: function (){
	    alert('Thanks for your comment!'); 
	  }
	});

	//let key = 9cf4b72704b2efcc
	fetch("http://api.wunderground.com/api/9cf4b72704b2efcc/hourly10day/q/IA/Decorah.json")
	.then(function(response) {
		return response.json()
	})
	.then(function(data){
		console.log(data)
	})

}
