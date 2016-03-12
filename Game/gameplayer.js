define([
    'WalrusEngine/Core/Logic/Player', 
    'Game/Score'
    ], 
    function (Player, Score) {

    /**
     * Klasa reprezentująca gracza w grze.
     * @constructor
     * @param {string} name Nazwa gracza
     */
	var GamePlayer = function (name) {
		Player.call(this);
		this.addCurrency("Score", new Score());
		this.setName(name);
	};

	GamePlayer.prototype = Object.create(Player.prototype, {
		constructor: {
			value: GamePlayer,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	var _p = GamePlayer.prototype;

	/**
	 * Zwiększa wartość wyniku.
	 */
	_p.hasWon = function () {
		this.currency("Score").changeValueBy(1);
	};

	return GamePlayer;

});