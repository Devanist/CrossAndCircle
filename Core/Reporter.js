define(['json!Game/reporter.json'], function (cfg) { 
	
	/**
	 * Klasa odpowiadająca za komunikację z serwerem.
	 * @constructor
	 */
	var Reporter = function(){
		this._cfg = cfg;
	};
	
	Reporter.prototype = {
		
	};
	
	return Reporter;
	
});