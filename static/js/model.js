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
	constructor(date, city, temp, chancePrecip, windSpeed, humidity, skyStatus) {
		this._date = date
		this._city = city
		this._temp = temp
		this._chancePrecip = chancePrecip
		this._windSpeed = windSpeed
		this._humidity = humidity
		this._skyStatus = skyStatus
	}

	get date() {
		return this._date
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
	constructor(homeTeam, awayTeam, date, time, staduim, homeScore, awayScore, final, lat, lng) {
		this._homeTeam = homeTeam
		this._awayTeam = awayTeam
		this._date = date
		this._time = time
		this._stadium = staduim
		this._homeScore = homeScore
		this._awayScore = awayScore
		this._final = final
		this._lat = lat
		this._lng = lng
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

	get staduim() {
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

	publishGames(){
		super.publish("Current Games", this)
	}

}