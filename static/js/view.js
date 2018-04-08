"use strict"

class GamesView {
	constructor(model){
		let self = this
		model.subscribe(function(a,b){
			self.redrawMap(a,b)
		})
	}

	redrawMap(msg, gamesList){
		let map = document.querySelector("#states")
		for (let game of gamesList) {
			//TODO
		}
	}

}
