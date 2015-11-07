define(['Core/Logic/Currency'], function(Currency){
	
	var Score = function(){
		Currency.call(this);
		this.setAmount(0);
	}
	
	Score.prototype = Object.create(Currency.prototype,{
		constructor: {
			value: Score,
			enumerable: false,
			writable: true,
			configurable: true
		}
	})
	
	return Score;
	
})