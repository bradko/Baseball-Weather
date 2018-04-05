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
	constructor(city, temp, chancePrecip, windSpeed, humidity, skyStatus) {
		this._city = city
		this._temp = temp
		this._chancePrecip = chancePrecip
		this._windSpeed = windSpeed
		this._humidity = humidity
		this._skyStatus = skyStatus
	}

	get city() { 
		return this._city
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

	get skyStatus() {
		return this._skyStatus
	}

	get humidity() {
		return this._humidity
	}

}


class Game {
	constructor(homeTeam, awayTeam, date, time, homeScore, awayScore, final) {
		this._homeTeam = homeTeam
		this._awayTeam = awayTeam
		this._date = date
		this._time = time
		this._homeScore = homeScore
		this._awayScore = awayScore
		this._final = false
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

	get homeScore() {
		return this._homeScore
	}

	get awayScore() {
		return this._awayScore
	}
	
	get final() {
		return this._final
	}

}

class gamesList extends Subject{

	constructor() {
		super()
		this._games = []
	}

	getGames() {
		this.publish("Current Games", this)
		return this._games
	}

	addGame(game) {
		this._games.push(game)
	}

}