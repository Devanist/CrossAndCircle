define(['Core/Logic/Player', 'Game/Score'], function(Player, Score){
	
	var GamePlayer = function(name){
		Player.call(this);
		this.addCurrency("Score", new Score());
		this.setName(name);
	}
	
	GamePlayer.prototype = Object.create(Player.prototype,{
		constructor: {
			value: GamePlayer,
			enumerable: false,
			writable: true,
			configurable: true
		}
	})
	
	var _p = GamePlayer.prototype;
	
	_p.hasWon = function(){
		this.currency("Score").changeValueBy(1);
	}
	
	return GamePlayer;
	
})