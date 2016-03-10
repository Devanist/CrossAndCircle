define([
    'Core/Core',
    'Game/gamelogic',
    'Core/GUI/Button',
    'Core/GUI/Label',
    'Core/GUI/Splash',
    'Core/GUI/group'
], 
function(Core, Logic, Button, Label, Splash, Group){
	
	var Game = function(canvas, font){
		Core.call(this, canvas, font);
		this._verticalSize = 0.33;
		this._horizontalSize = 0.33;
		this._squares = null;
	};
	
	Game.prototype = Object.create(Core.prototype, {
		
		constructor: {
			value: Game,
			enumerable: false,
			writable: true,
			configurable: true
		}
		
	});
	
	var _p = Game.prototype;
	
	/**
		Funkcja zwracająca wartość zmiennej verticalSize
		@returns {double}
	*/
	_p.getVerticalSize = function(){
		return this._verticalSize;
	};
	
	/**
		Funkcja zwracająca wartość zmiennej horizontalSize
		@returns {double}
	*/
	_p.getHorizontalSize = function(){
		return this._horizontalSize;
	};
	
	/**
	 * Rozszerzona metoda z klasy Core. 
	 */
	_p.setLogic = function(logic){
		this.assignLogic(logic);
	};
	
	/**
		Funkcja próbuje dodać nowy znak na planszy.
		@param {int} w - numer wiersza
		@param {int} k - numer kolumny
	*/
	_p.tryAddSign = function(w, k){
		if(this._logic.isCellFree(w,k) === true){
			this._logic.putInCell(w,k);
			this.renderSigns();
			this._logic.nextPlayer();
			this._logic.madeMove();
		}
	};
	
	/**
		Funkcja rysuje wszystkie dotychczasowe znaki na mapie.
	*/
	_p.renderSigns = function(){
		for(var w = 0; w < 3; w++){
			for(var k = 0; k < 3; k++){
				this._renderer.renderSign(w, k, this._logic.getSign(w,k), this._squares);
			}
		}
	};
	
	/**
		Funkcja obsługuje wygraną. Wyświetla splash screen, przyciski i ewentualnie zwiększa wynik.
		@param {const int} who - stała wskazująca kto wygrał
	*/
	_p.handleWin = function(who){
        var that = this;
        
		if(this._logic.getState() != Logic.FINISHED){
			
            if(who != Logic.EMPTY){
                
				this._logic.setState(Logic.FINISHED);
                
                var winGroup = new Group();
                this._GUIList.addElement("win_group", winGroup);
                
				winGroup.addElement("win_splash", new Splash("white", {r: 0, g: 0, b: 0}));
				this._logic.increaseScore(who);
				this._GUIList.getElement("score_red").setText(this._logic.getPlayerScore("Red"));
				this._GUIList.getElement("score_green").setText(this._logic.getPlayerScore("Green"));

				winGroup.addElement("win_again", new Button(0.2, 0.48, 0.2, 0.08, this._canvas.width, this._canvas.height, function(e){
					//removebuttons
					e.stopPropagation();
					that._renderer.clear();
					that._GUIList.deleteElement("win_group");
					that._logic.resetLogic();
					that.renderScreen();
				}, "AGAIN"));
				winGroup.addElement("win_main", new Button(0.6, 0.48, 0.2, 0.08, this._canvas.width, this._canvas.height, function(e){
					e.stopPropagation();
					that._logic.resetScore();
					that._logic.resetLogic();
					that._logic.setScreen(Logic.SCREEN_MENU);
				}, "MAIN MENU"));
				winGroup.addElement("win_winner", new Label(0, 0.44, 1, 1/4, this._canvas.width, this._canvas.height, "black", ""));
                
				if(who == Logic.RED){
					winGroup.getElement("win_winner").setText("red won!");
				}
				else if(who == Logic.GREEN){
					winGroup.getElement("win_winner").setText("green won!");
				}
				else if(who == Logic.DRAW){
					winGroup.getElement("win_winner").setText("draw!");
				}
                
			}
		}
	};
	
	/**
		Funkcja przygotowuje elementy ekranu do wyrysowania.
	*/
	_p.setUpScreen = function(){
	
		this._renderer.clear();
		this._GUIList.deleteAllElements();
		var that = this;
		switch(this._logic.currentScreen()){
	
			case Logic.SCREEN_MENU:
				this._renderer.renderMenu(this._fontSize);
				this._GUIList.addElement("menu_newgame", new Button(0.3, 0.6, 0.4, 0.08, this._canvas.width, this._canvas.height,
						function(e){
							e.stopPropagation();
							that._logic.setScreen(Logic.SCREEN_GAME);
						}, 
						"NEW GAME"));
				this._GUIList.addElement("menu_about", new Button(0.3, 0.75, 0.4, 0.08, this._canvas.width, this._canvas.height,
						function(){
							document.getElementById("aboutLink").click();
					},
					"ABOUT"));
				this.renderScreen();
				break;
	
			case Logic.SCREEN_GAME:
				this._GUIList.addElement("score_green", new Label(0.3, 0.2, 0.4, 0.3, this._canvas.width, this._canvas.height, "green", this._logic.getPlayerScore("Green"), 0.2));
				this._GUIList.addElement("score_red", new Label(0.3, 0.95, 0.4, 0.3, this._canvas.width, this._canvas.height, "red", this._logic.getPlayerScore("Red"), 0.2));
				this.renderScreen();
				break;
		}
	};
	
	/**
		Funkcja obsługująca kliknięcie na ekranie przez użytkownika. Sprawdza również czy gra została zakończona.
		@param {double} x - Współrzędna x kliknięcia
		@param {double} y - Współrzędna y kliknięcia
	*/
	_p.handleClick = function(e){
		var x = e.x;
		var y = e.y;
        var l = this._GUIList.length();
        var i = 0;
        var temp = null;
        
		this._soundctrl.playSound('tick');
		if(this._logic.currentScreen() == Logic.SCREEN_MENU){
            
            temp = this._GUIList.getElement(i);
            
			for(i = 0; i < l; i++){
				if(x > temp.getX() && x < temp.getEndX() && 
                   y > temp.getY() && y < temp.getEndY()){
					temp.runCallback(e);
				}
			}
		}
		else if(this._logic.currentScreen() == Logic.SCREEN_GAME){
			//KLIKNIECIE PODCZAS GRY
			if(this._logic.getState() != Logic.FINISHED && (y >= this._squares.top && y <= this._squares.bottom)){
	
				var end;
	
				if(x < this._squares.leftVertical){
					if(y < this._squares.upperHorizontal){
						this.tryAddSign(0,0);
					}
					else if(y < this._squares.lowerHorizontal){
						this.tryAddSign(1,0);
					}
					else{
						this.tryAddSign(2,0);
					}
				}
				else if(x < this._squares.rightVertical){
					if(y < this._squares.upperHorizontal){
						this.tryAddSign(0,1);
					}
					else if(y < this._squares.lowerHorizontal){
						this.tryAddSign(1,1);
					}
					else{
						this.tryAddSign(2,1);
					}
				}
				else if(x > this._squares.rightVertical){
					if(y < this._squares.upperHorizontal){
						this.tryAddSign(0,2);
					}
					else if(y < this._squares.lowerHorizontal){
						this.tryAddSign(1,2);
					}
					else{
						this.tryAddSign(2,2);
					}
				}
				end = this._logic.checkIfWin();
				this.handleWin(end);
				this._renderer.clear();
				this.renderScreen();
			}
			else{
				for(i = 0; i < l; i++){
					if(x > this._GUIList.getElement(i).getX() && x < this._GUIList.getElement(i).getEndX() && 
                       y > this._GUIList.getElement(i).getY() && y < this._GUIList.getElement(i).getEndY()){
						this._GUIList.getElement(i).runCallback(e);
					}
				}
			}
		}
	};
	
	return Game;
	
});
