define(['json!Game/sounds.json', 'json!Game/graphics.json'], function (sounds, graphics) {
	
	/**
	 * Klasa ładująca zasoby dla gry.
	 * @constructor
	 */
	var FileLoader = function (sounds, graphics) {
		this._engineAssets = [
			{
				name: "engineLogo",
				assetType: "graphic",
				source: ""
			},
			{
				name: "engineIntro",
				assetType: "sound",
				source: ""
			}
		];
		this._gameAssets = {
			sounds: [],
			graphics: []
		};
	};
	
	FileLoader.prototype = {
		
		/**
		 * Funkcja ładuje zasoby silnika.
		 */
		loadEngineAssets: function () {
			
		},
		
		loadGameSounds: function () {
			
		},
		
		loadGameGraphics: function () {
			
		},
		
		/**
		 * Zwraca uchwyt do zasobu audio.
		 */
		getSound: function (name) {
			return this._gameAssets.sounds[name];
		},
		
		/**
		 * Zwraca uchwyt do zasobu graficznego.
		 */
		getGraphic: function (name) {
			return this._gameAssets.graphics[name];
		}
		
	};
	
});