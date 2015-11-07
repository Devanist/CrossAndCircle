define(['Core/Logic/Logic'], function(LogicCore){
	
	var GameLogic = function(){
		LogicCore.call(this);
        this._board = [
                        [GameLogic.EMPTY,GameLogic.EMPTY,GameLogic.EMPTY],
                        [GameLogic.EMPTY,GameLogic.EMPTY,GameLogic.EMPTY],
                        [GameLogic.EMPTY,GameLogic.EMPTY,GameLogic.EMPTY]
        ];
        this._moves = 9;
	};
	
	GameLogic.prototype = Object.create(LogicCore.prototype, {
		constructor: {
			value: GameLogic,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	
	var _p = GameLogic.prototype;
	
	/**
        Stała oznajmiająca, że gra została zakończona.
        @constant
     */
    GameLogic.FINISHED = 1;
    
    /**
        Stała oznajmiająca, że gra nadal trwa.
        @constant
     */
    GameLogic.INPROGRESS = 0;
    
    /**
        Stała oznaczająca, że bieżącym ekranem jest menu.
        @constant
    */
    GameLogic.SCREEN_MENU = 0;
    
    /**
        Stała oznaczająca, że bieżącym ekranem jest ekran gry.
        @constant
    */
    GameLogic.SCREEN_GAME = 1;
    
    //Dwie stałe reprezentujące graczy: RED i GREEN
    
    /**
        Stała oznaczająca puste pole.
    */
    GameLogic.EMPTY = 2;
    
    /**
        Stała oznaczająca gracza czerwonego - X
        @constant
    */
    GameLogic.RED = 1;
    
    /**
        Stała oznaczająca gracza zielonego - O
        @constant
    */
    GameLogic.GREEN = 0;
    
    /**
        Stała oznaczająca, że gra zakończyła się remisem.
        @constant
    */
    GameLogic.DRAW = 3;
	
	/**
	 * Funkcja zwracająca wynik danego gracza
	 * @param {string} player - Nazwa gracza
	 * @returns {int}
	 */
	_p.getPlayerScore = function(player){
		return this._players[player].currency("Score").getAmount();
	};
	
	/**
		Funkcja resetująca stan logiki.
	*/
	_p.resetLogic = function(){
		this._currentPlayer = GameLogic.GREEN;
		this._board = [
						[GameLogic.EMPTY,GameLogic.EMPTY,GameLogic.EMPTY],
						[GameLogic.EMPTY,GameLogic.EMPTY,GameLogic.EMPTY],
						[GameLogic.EMPTY,GameLogic.EMPTY,GameLogic.EMPTY]
								];
		this._moves = 9;
		this._state = GameLogic.INPROGRESS;
	};
	
	/**
	    Funkcja resetująca wynik gry.
	 */
	_p.resetScore = function(){
		
		for(var player in this._players){
			if(this._players.hasOwnProperty(player))
				this._players[player].currency("Score").setAmount(0);
		}
		
	};
	
	/**
		Funkcja zwraca informację, czy komórka, do której chcemy wstawić znak
		jest pusta czy nie.
		@param {int} w - Numer wiersza
		@param {int} k - Numer kolumny
		@returns {bool}
	*/
	_p.isCellFree = function(w, k){
		if(this._board[w][k] == GameLogic.EMPTY){
			return true;
		}
		return false;
	};
	
	/**
		Funkcja dekrementuje liczbę pozostałych ruchów.
	*/
	_p.madeMove = function(){
		this._moves--;
		console.log(this._moves);
	};
	
	/**
		Funkcja zwraca liczbę pozostałych do wykonania ruchów
		@returns {int}
	*/
	_p.movesLeft = function(){
		return this._moves;
	};
	
	/**
		Funkcja wstawia znak obecnego gracza w miejsce podane przez kliknięcie.
		@param {int} w - Numer wiersza, do którego chcemy wstawić znak
		@param {int} k - Numer kolumny, do której chcemu wstawić znak
	*/
	_p.putInCell = function(w, k){
		this._board[w][k] = this._currentPlayer;
	};

	/**
	    Funkcja zwiększająca wynik zwycięskiego gracza.
	 */
	_p.increaseScore = function(who){
		if(who == GameLogic.RED){
			this.getPlayer("Red").currency("Score").changeValueBy(1);
		}
		else if(who == GameLogic.GREEN){
			this.getPlayer("Green").currency("Score").changeValueBy(1);
		}
	};
	
	/**
		Funkcja zmienia aktualnie aktywnego gracza
	*/
	_p.nextPlayer = function(){
		if(this._currentPlayer == GameLogic.RED){
			this._currentPlayer = GameLogic.GREEN;
		}
		else this._currentPlayer = GameLogic.RED;
	};
	
	/**
		Po wykonaniu ruchu gra sprawdza czy spełniony jest któryś z warunków zakończenia gry.
		Jeżeli wygrał gracz czerwony, zwraca GameLogic.RED, jeżeli zielony - zwraca GameLogic.GREEN,
		jeżeli mecz zakończył się remisem zwraca GameLogic.DRAW, gra nadal trwa GameLogic.EMPTY.
		@returns {int}
	*/
	_p.checkIfWin = function(){
	
		var row;
		var col;
		var diag = 0;
		var diag2 = 0;
	
		for(var i = 0; i < 3; i++){
	
			row = 0;
	
			if(i == 0){
				if(this._board[i][0] == GameLogic.RED){
					diag++;
				}
				else if(this._board[i][0] == GameLogic.GREEN){
					diag--;
				}
				if(this._board[i][2] == GameLogic.RED){
					diag2++;
				}
				else if(this._board[i][2] == GameLogic.GREEN){
					diag2--;
				}
			}
			else if(i == 1){
				if(this._board[1][1] == GameLogic.RED){
					diag++;
					diag2++;
				}
				else if(this._board[1][1] == GameLogic.GREEN){
					diag--;
					diag2--;
				}
			}
			else if(i == 2){
				if(this._board[i][0] == GameLogic.RED){
					diag2++;
				}
				else if(this._board[i][0] == GameLogic.GREEN){
					diag2--;
				}
				if(this._board[i][2] == GameLogic.RED){
					diag++;
				}
				else if(this._board[i][2] == GameLogic.GREEN){
					diag--;
				}
			}
	
			for(var j = 0; j < 3; j++){
	
				if(this._board[i][j] == GameLogic.RED){
					row++;
				}
				else if(this._board[i][j] == GameLogic.GREEN){
					row--;
				}
	
				col = 0;
	
				for(var k = 0; k < 3; k++){
	
					if(this._board[k][j] == GameLogic.RED){
						col++;
					}
					else if(this._board[k][j] == GameLogic.GREEN){
						col--;
					}
				}
	
				if(col == 3){
					return GameLogic.RED;
				}
				else if(col == -3){
					return GameLogic.GREEN;
				}
	
			}
	
			if(row == 3){
				return GameLogic.RED;
			}
			else if(row == -3){
				return GameLogic.GREEN;
			}
		}
	
		if(diag == 3){
			return GameLogic.RED;
		}
		else if(diag == -3){
			return GameLogic.GREEN;
		}
	
		if(diag2 == 3){
			return GameLogic.RED;
		}
		else if(diag2 == -3){
			return GameLogic.GREEN;
		}
	
		if(this.movesLeft() == 0){
			return GameLogic.DRAW;
		}
	
		return GameLogic.EMPTY;
	
	};
	
	/**
		Funkcja zwracająca znak z danego pola.
		@param {int} w - numer wiersza
		@param {int} k - numer kolumny
		@returns {int}
	*/
	_p.getSign = function(w, k){
		return this._board[w][k];
	};
	
	return GameLogic;
	
});