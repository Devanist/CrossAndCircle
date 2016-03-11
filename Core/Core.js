define([
    'Core/FileLoader',
    'Game/gamelogic',
    'Core/GUI/button',
    'Core/GUI/label',
    'Core/GUI/splash',
    'Core/GUI/init',
    'Core/GUI/sprite',
    'Core/GUI/group'
    ],
	function(FileLoader, Logic, Button, Label, Splash, GUI, Sprite, Group){
			
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
		this._GUIList = new Group();
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
            this._GUIList.update(this._canvas.width, this._canvas.height);
			this.renderScreen();
			this._renderer.renderGroup(this._GUIList);
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
			this._renderer.renderGroup(this._GUIList);
		},
        
        /**
         * Funkcja wyświetla logo silnika, a następnie uruchamia grę.
         */
        runGame : function(){
            var that = this;
            
            this._fileLoader.loadEngineAssets(function(){

                that._GUIList.addElement("engine_logo", 
                    new Sprite("CENTER", 
                        {w:500, h:418}, 
                        that._canvas.width, 
                        that._canvas.height, 
                        that._fileLoader.getGraphic('engineLogo')
                    )
                );
                    
                that._renderer.clear();
                that._renderer.renderGroup(that._GUIList);
                //that._renderer.fadeIn("all", {r: 0, g: 0, b: 0});
                    
                setTimeout(function(){
                    that._GUIList.deleteElement("engine_logo");
                    that._logic.setScreen(0);
                    that.setUpScreen();
                    that.renderScreen();
                    that._renderer.renderGroup(that._GUIList);
                }, 3000);
            });
        }

	};

	return Core;

});
