define(['Core/FileLoader' ,'Game/gamelogic', 'Core/GUI/button', 'Core/GUI/label', 'Core/GUI/splash', 'Core/GUI/init', 'Core/GUI/sprite'],
		function(FileLoader, Logic, Button, Label, Splash, GUI, Sprite){
			
	"use strict";
	
/**
	Konstruktor - tworzy obiekt klasy Game. W całym programie powinna występować tylko jedna instancja tej klasy.
	Klasa odpowiedzialna jest za komunikacje pozostałych klas w programie. Przyjmuje informacje o zdarzeniach
	oraz rozsyła je do odpowiednich bloków.
	@constructor
	@param {canvas} canvas - Główny element canvas programu
	@param {string} font - Czcionka, której chcemy używać
*/
	var Core = function(canvas, font){
		this._canvas = canvas;
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;
		this._fontSize = 0.03;
		this._font = "px 'Monoglyceride'";
		this._GUIList = [];
        this._fileLoader = new FileLoader();
	};
	
	Core.prototype = {

		/**
			Funkcja zwraca obiekt canvas
			@returns {canvas}
		*/
		getCanvas: function(){
			return this._canvas;
		},
		
		/**
			Funkcja zwracająca szerokość obiektu canvas
			@returns {double}
		*/
		getWidth : function(){
			return this._canvas.width;
		},
		
		/**
			Funkcja zwracająca wysokość obiektu canvas
			@returns {double}
		*/
		getHeight : function(){
			return this._canvas.height;
		},
		
		/**
			Funkcja zwracająca context dwuwymiarowy obiektu canvas
			@returns {double} canvas.getContext('2d')
		*/
		getContext2D : function(){
			return this._canvas.getContext('2d');
		},
		
		/**
		 * Funkcja zwracająca context 3D aka webGL/experimental webGL
		 */
		getContext3D : function(){
			return this._canvas.getContext('webgl') || this._canvas.getContext('experimental-webgl');
		},
		
		/**
			Przypisuje obiekt klasy GfxRenderer do obiektu Game, by mógł się on do niego odwoływać bez podawania go
			jako parametr.
			@param {GfxRenderer} gfxr - Obiekt klasy GfxRenderer
		*/
		setRenderer : function(gfxr){
			this._renderer = gfxr;
		},
		
		/**
			Przypisuje obiekt klasy Logic do obiektu Game, by mógł się on do niego odwoływać bez podawania go
			jako parametr.
		*/
		assignLogic : function(logic){
			this._logic = logic;
		},
		
		/**
		 * Funkcja przypisuje obiekt klasy SoundController do obiektu Game.
		 * @param {SoundController} sctrl - Obiekt klasy SoundController
		 */
		setSoundController : function(sctrl){
			this._soundctrl = sctrl;
		},
		
		/**
			Funkcja zwracająca rozmiar czcionki
			@returns {double}
		*/
		getFontSize : function(){
			return this._fontSize;
		},
		
		/**
			Funkcja zwracająca nazwę czcionki w postaci "px Nazwa"
			@returns {string}
		*/
		getFont : function(){
			return this._font;
		},
		
		/**
			Funkcja obsługująca zdarzenie resize przeglądarki. Wywoływana przy zmianie
			rozmiaru okna przeglądarki. Przypisuje do zmiennych nowy rozmiar okna, uaktualnia
			dane obiektu klasy GfxRenderer, który następnie odmalowuje canvas.
		*/
		handleResize : function(){
			this._canvas.width = window.innerWidth;
			this._canvas.height = window.innerHeight;
			this._renderer.update(this.getWidth(), this.getHeight());
			for(var i = 0; i < this._GUIList.length; i++){
				this._GUIList[i].update(this._canvas.width, this._canvas.height);
			}
			this.renderScreen();
			this.renderGUI();
		},
		
		/**
			Funkcja obsługująca kliknięcie na ekranie przez użytkownika. Powinna zostać przesłonięta w klasie pochodnej.
			@param {double} x - Współrzędna x kliknięcia
			@param {double} y - Współrzędna y kliknięcia
		*/
		handleClick : function(x, y){
		
		},
		
		/**
			Funkcja przygotowuje elementy ekranu do wyrysowania.
		*/
		setUpScreen : function(){
		},
		
		/**
			Funkcja rysuje odpowiedni ekran, odpytując klasę Logic.
		*/
		renderScreen : function(){
            this._renderer.clear();
			if(this._logic.currentScreen() == Logic.SCREEN_MENU){
				this._renderer.renderMenu(this._fontSize);
			}
			if(this._logic.currentScreen() == Logic.SCREEN_GAME){
				this._squares = this._renderer.renderMap(this._horizontalSize, this._verticalSize);
				this.renderSigns();
			}
			this.renderGUI();
		},
		 
		/**
			Funkcja wywołuje konstruktor klasy Button, tworząc nowy przycisk,
			a następnie dodaje go do listy elementów GUI.
			@param {double} x - współrzędna x
			@param {double} y - współrzędna y
			@param {double} w - szerokość
			@param {double} h - wysokość
			@param {int} width - szerokość okna
			@param {int} height - wysokość okna
			@param {function} foo - funkcja callback
			@param {string} text - tekst do wyświetlenia na przycisku
		*/
		createButton : function(x, y, w, h, width, height, foo, text){
			this._GUIList[this._GUIList.length] = new Button(x, y, w, h, width, height, foo, text);
		},
		
		/**
		 * Funkcja wywołuje konstruktor klasy Label, tworząc nową etykietę,
		 * a następnie dodaje ją do listy elementów GUI.
		 * @param {double} x - współrzędna x
		 * @param {double} y - współrzędna y
		 * @param {double} w - szerokość
		 * @param {double} h - wysokość
		 * @param {int} width - szerokość okna
		 * @param {int} height - wysokość okna
		 * @param {color} color - kolor czcionki
		 * @param {string} text - tekst do wyświetlenia
		 */
		createLabel : function(x, y, w, h, width, height, color, text, fontSize){
			this._GUIList[this._GUIList.length] = new Label(x, y, w, h, width, height, color, text, fontSize);
		},
		
		/**
		 * Funkcja tworzy splash i dodaje go do listy elementów GUI.
		 */
		createSplash : function(color, secondColor){
			this._GUIList[this._GUIList.length] = new Splash(color, secondColor);
		},
        
        /**
         * Funkcja tworzy sprite i dodaje go do listy elementów GUI.
         */
        createSprite : function(position, size, width, height, sprite){
            this._GUIList[this._GUIList.length] = new Sprite(position, size, width, height, sprite);
        },
        
        /**
         * Funkcja wyświetla logo silnika, a następnie uruchamia grę.
         */
        runGame : function(){
            var that = this;
            
            this._fileLoader.loadEngineAssets(function(){

                that.createSprite(
                    "CENTER", 
                    {w:500, h:418}, 
                    that._canvas.width, 
                    that._canvas.height, 
                    that._fileLoader.getGraphic('engineLogo')
                );
                
                that._renderer.clear();
                that.renderGUI();
                that._renderer.fadeIn("all", {r: 0, g: 0, b: 0});
                
                setTimeout(function(){
                    that.removeLastElement();
                    that._logic.setScreen(0);
                    that.setUpScreen();
                    that.renderScreen();
                    that.renderGUI();
                }, 3000);
            });
        },
        
		/**
			Funkcja rysuje wszystkie istniejące elementy graficznego interfejsu użytkownika.
		*/
		renderGUI : function(){
			for(var i = 0; i < this._GUIList.length; i++){
				if(this._GUIList[i].getType() === "button"){
					this._renderer.renderButton(this._fontSize, this._GUIList[i]);
				}
				if(this._GUIList[i].getType() === "label"){
					this._renderer.renderLabel(this._fontSize, this._GUIList[i]);
				}
				if(this._GUIList[i].getType() === "splash"){
					this._renderer.renderSplash(this._GUIList[i]);
				}
                if(this._GUIList[i].getType() === "sprite"){
                    this._renderer.renderSprite(this._GUIList[i]);
                }
			}
		},
		
		getLastGUIElement : function(){
			return this._GUIList[this._GUIList.length - 1];
		},
		
		/**
			Funkcja czyści listę elementów GUI.
		*/
		purgeGUIList : function(){
			this._GUIList.length = 0;
		},
		
		/**
		    Funkcja usuwa ostatni element z listy GUI
		 */
		removeLastElement : function(){
			this._GUIList.splice(this._GUIList.length - 1,1);
		}

	};

	return Core;

});
