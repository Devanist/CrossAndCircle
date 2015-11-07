define(['json!Game/sounds.json'],function(cfg){	
	
	/**
	 * Klasa kontrolująca odtwarzanie i miksowanie audio w grze.
	 * @constructor
	 */
	class Speaker{
		
		constructor(){
			this._soundsList = [];
			this._soundsPlaying = [];
		}
		
		/**
		 * Funkcja dodająca dźwięki do gry.
		 */
		addSounds(){
			for(let i = 0; i < cfg.sounds.length; i++){
				this._soundsList[cfg.sounds[i].name] = new Audio(cfg.sounds[i].path);
			}
		}
		
		/**
		 * Funkcja odtwarzająca podany jako parametr dźwięk. Tworzy jego nową instancję,
		 * nasłuchuje czy odtwarzanie dźwięku zostało zakończone i jeśli tak to usuwa go
		 * z listy odtwarzanych dźwięków.
		 * @param {string} sound - Nazwa dźwięku
		 */
		playSound(sound){
			if(!this._soundsPlaying[sound]){
				this._soundsPlaying[sound] = this._soundsList[sound].cloneNode(true);
				this._soundsPlaying[sound].addEventListener('ended', function(){
					this._soundsPlaying[sound] = null;
				}.bind(this));
				this._soundsPlaying[sound].play();
			}
			else{
				this._soundsPlaying[sound].play();
			}
		}
		
		/**
		 * Funkcja pauzująca odtwarzany dźwięk.
		 * @param {string} sound - Nazwa dźwięku
		 */
		pauseSound(sound){
			if(this._soundsPlaying[sound]){
				this._soundsPlaying[sound].pause();
			}
		}
		
		/**
		 * Funkcja zatrzymująca odtwarzanie dźwięku.
		 */
		stopSound(sound){
			if(this._soundsPlaying[sound]){
				this._soundsPlaying[sound].pause();
				this._soundsPlaying[sound].currentTime = 0;
				this._soundsPlaying[sound] = null;
			}
		}
		
	};
	
	
	
})