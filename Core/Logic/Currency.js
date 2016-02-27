define([], function(){
	
	/**
	 * Klasa reprezentująca walutę w grze. Waluty należy wprowadzać
	 * jako rozszerzenia tej klasy.
	 */
	var Currency = function(){
		this._amount = 0;
	};

	Currency.prototype = {
		
		/**
		 * Funkcja zwracająca posiadaną ilość danej waluty.
		 * @returns {double}
		 */
		getAmount: function(){
			return this._amount;
		},
		
		/**
		 * Funkcja ustawiająca ilość waluty.
		 * @param {double} amount - Ilość waluty
		 */
		setAmount: function(amount){
			this._amount = amount;	
		},
		
		/**
		 * Funkcja zmieniająca wartość waluty o podaną ilość.
		 * @param {double} amount - ilość waluty
		 */
		changeValueBy : function(amount){
			this._amount += amount;
		}
		
	};
	
	return Currency;
	
});