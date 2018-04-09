"use strict"

class GamesView {
	constructor(model){
		let self = this
		model.subscribe(function(a,b){
			self.redrawMap(a,b)
		})
	}

	redrawMap(gamesList, msg) {
		let lats = []
		let lngs = []
		for (let game of gamesList._games){
			lats.push(game.lat)
			lngs.push(game.lng)
		}
		console.log(lats)
		console.log(lngs)
	}

}
