define(['Core/Reporter'], function (Reporter) { 
	
	var GameReporter = function () {
		Reporter.call(this);
		this._playerID = this.createPlayerID();
	};
	
	GameReporter.prototype = Object.create(Reporter.prototype, {
		constructor: {
			value: GameReporter,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	
	var _p = GameReporter.prototype;
	
	/**
	 * Wysyła zapytanie do serwera o utworzenie nowego ID użytkownika do komunikacji z serwerem.
	 * W przypadku gdy nie można połączyć się z serwerem, zwracana jest wartość null.
	 */
	_p.createPlayerID = function () {
		return null;
	};
	
});