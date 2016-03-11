define(['json!Game/sounds.json', 'json!Game/graphics.json'],
	function (sounds, graphics) {
	
	/**
	 * Klasa ładująca zasoby dla gry.
	 * @constructor
	 */
	var FileLoader = function (sounds, graphics) {
		this._engineAssets = [
			{
				name: "engineLogo",
				assetType: "graphic",
				source: "Core/Assets/logo.jpg"
			}
		];
		this._gameAssets = {
			sounds: [],
			graphics: []
		};
        this._loadedAssets = 0;
        this._allAssets = this._engineAssets.length;
	};
	
	FileLoader.prototype = {
		
		/**
		 * Funkcja ładuje zasoby silnika.
		 */
		loadEngineAssets: function (callback) {
            var that = this;
			if(this._loadedAssets !== this._allAssets){
                var name = this._engineAssets[this._loadedAssets].name;
                this._gameAssets.graphics[name] = new Image();
                this._gameAssets.graphics[name].onload = function(e){
                    that.loadEngineAssets(callback);
                };
                this._gameAssets.graphics[name].src = this._engineAssets[this._loadedAssets].source;
                this._loadedAssets++;
            }
            else{
                callback();
            }
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
    
    return FileLoader;
	
});