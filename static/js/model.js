"use strict"

class Subject {
	constructor() {
		this.handlers = []
	}

	subscribe(fn) {
		this.handlers.push(fn)
	}

	unsubscribe(fn) {
		this.handlers = this.handlers.filter(
			function(item) {
				if (item !== fn) {
					return item;
				}
			}
		);
	}

	publish(msg, someobj) {
		var scope = someobj || window;
		for (let fn of this.handlers) {
			fn(scope, msg)
		}
	}

}

class Weather {
	constructor(temp, chancePrecip, windSpeed, humidity, conditions) {
		this._temp = temp
		this._chancePrecip = chancePrecip
		this._windSpeed = windSpeed
		this._humidity = humidity
		this._conditions = conditions
	}

	get temp() {
		return this._temp
	}

	get chancePrecip() {
		return this._chancePrecip
	}

	get windSpeed() {
		return this._windSpeed
	}

	get conditions() {
		return this._skyStatus
	}

	get humidity() {
		return this._humidity
	}

}

class Game {
	constructor(homeTeam, awayTeam, date, time, stadium, homeScore, awayScore, final, lat, lng, city, state) {
		this._homeTeam = homeTeam
		this._awayTeam = awayTeam
		this._date = date
		this._time = time
		this._stadium = stadium
		this._homeScore = homeScore
		this._awayScore = awayScore
		this._final = final
		this._lat = lat
		this._lng = lng
		this._city = city
		this._state = state
	}

	get homeTeam() { 
		return this._homeTeam
	}

	get awayTeam() {
		return this._awayTeam
	}

	get date() {
		return this._date
	}

	get time() {
		return this._time
	}

	get stadium() {
		return this._stadium
	}

	get homeScore() {
		return this._homeScore
	}

	get awayScore() {
		return this._awayScore
	}
	
	get final() {
		return this._final
	}

	get lat() {
		return this._lat
	}

	get lng() {
		return this._lng
	}

	get city() {
		return this._city
	}

	get state() {
		return this._state
	}

	set state(val) {
		this._state = val
	}

	set city(val) {
		this._city = val
	}
	
}

class GamesList extends Subject{

	constructor() {
		super()
		this._games = []
	}

	getGames() {
		return this._games
	}

	addGame(game) {
		this._games.push(game)
	}

	clearGames() {
		this._games = []
	}

	publishGames(){
		super.publish("Current Games", this)
	}

}