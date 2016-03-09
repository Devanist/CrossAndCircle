define(['json!Game/sounds.json'],function(cfg){
	
	/**
	 * Klasa kontrolująca odtwarzanie i audio w grze.
	 * @constructor
	 */
	var SoundController = function(){
		this._soundsList = [];
		this.addSounds();
		this._soundsPlaying = [];
	};
	
	SoundController.prototype = {
		
		/**
		 * Funkcja odtwarzająca podany jako parametr dźwięk. Tworzy jego nową instancję,
		 * nasłuchuje czy odtwarzanie dźwięku zostało zakończone i jeśli tak to usuwa go
		 * z listy odtwarzanych dźwięków.
		 * @param {string} sound - Nazwa dźwięku
		 */
		playSound : function(sound){
			if(!this._soundsPlaying[sound]){
			    this._soundsPlaying[sound] = this._soundsList[sound].cloneNode(true);
			    document.body.appendChild(this._soundsPlaying[sound]);
				this._soundsPlaying[sound].addEventListener('ended', function () {
				    this._soundsPlaying[sound].parentNode.removeChild(this._soundsPlaying[sound]);
					this._soundsPlaying[sound] = null;
				}.bind(this));
				this._soundsPlaying[sound].play();
			}
			else{
				this._soundsPlaying[sound].play();
			}
		},
		
		/**
		 * Funkcja pauzująca odtwarzany dźwięk.
		 * @param {string} sound - Nazwa dźwięku
		 */
		pauseSound : function(sound){
			if(this._soundsPlaying[sound]){
				this._soundsPlaying[sound].pause();
			}
		},
		
		/**
		 * Funkcja zatrzymująca odtwarzanie dźwięku.
		 */
		stopSound : function(sound){
			if(this._soundsPlaying[sound]){
				this._soundsPlaying[sound].pause();
				this._soundsPlaying[sound].currentTime = 0;
				this._soundsPlaying[sound] = null;
			}
		},
		
		/**
		 * Funkcja dodająca dźwięki do gry.
		 */
		addSounds : function(){
			for(var i = 0; i < cfg.sounds.length; i++){
				this._soundsList[cfg.sounds[i].name] = new Audio(cfg.sounds[i].path);
			}
		},
		
	};
	
	return SoundController;
	
});