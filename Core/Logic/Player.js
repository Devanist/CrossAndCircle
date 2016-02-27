define([], function(){
	
	/**
	 * Klasa reprezentująca gracza.
	 * @constructor
	 */
	var Player = function(){
		this._name = "";
		this._currencies = {};
	};
	
	Player.prototype = {
		
		/**
		 * Funkcja zwracająca nazwę gracza.
		 * @returns {string}
		 */
		getName: function(){
			return this._name;
		},
		
		/**
		 * Funkcja zmieniająca nazwę gracza.
		 * @param {string} name - Nazwa gracza
		 */
		setName: function(name){
			this._name = name;
		},
		
		/**
		 * Funkcja dodająca walutę dla gracza.
		 * @param {string} name - nazwa waluty
		 * @param {object} obj - obiekt przechowujący informację o danej walucie
		 */
		addCurrency: function(name, obj){
			if(this._currencies[name])
				throw "There is already currency "+name;
			this._currencies[name] = obj;
		},
		
		/**
		 * Zwraca obiekt reprezentujący daną walutę.
		 * @param {string} name - nazwa waluty
		 * @returns {object}
		 */
		currency : function(name){
			return this._currencies[name];
		}
		
	};
	
	return Player;
	
});