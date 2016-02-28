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
				source: "http://static.devanist.cba.pl/images/logo.png"
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
		loadEngineAssets: function () {
			for(var asset in this._engineAssets){
                if(asset.assetType === "graphic"){
                    
                    this._gameAssets.graphics[name] = new Image();
                    this._gameAssets.graphics[name].onload = function(){
                        this._loadedAssets++;
                    }.bind(this);
                    this._gameAssets.graphics[name].src = asset.source;
                    
                }
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
		},
        
        areEngineAssetsLoaded: function(callback){
            while(this._loadedAssets !== this._allAssets){
                console.log("Loaded " + this._loadedAssets + " of " + this._allAssets);
            }
            callback();
        }
		
	};
    
    return FileLoader;
	
});