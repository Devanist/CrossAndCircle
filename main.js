define([
	'Game/game', 
	'Game/gamerenderer', 
	'Game/gamelogic',
	'WalrusEngine/Core/SoundController',
    'json!Game/sounds.json'
    ],
	function(Game, GameRenderer, Logic, SoundController, soundsCfg){

	//Tworzenie instancji klas
	var _g = new Game(document.getElementById('mainCanvas'), "Monoglyceride");
	var _gfxr = new GameRenderer(_g.getContext2D(), _g.getWidth(), _g.getHeight(), _g.getFont(), _g.getFontSize());
	var _logic = new Logic();
	var _sctrl = new SoundController(soundsCfg);
	
	_g.setRenderer(_gfxr);
	_g.setLogic(_logic);
	_g.setSoundController(_sctrl);

	//Czyszczenie ekranu
	_gfxr.clear();

	//Nasłuchiwanie zdarzeń
	window.addEventListener("resize", function(){
		_g.handleResize();
	});

	document.addEventListener("screenChanged", function(){
		_g.setUpScreen();
	});
	
	_g.getCanvas().addEventListener("mousedown", function(e){
		_g.handleClick(e);
		e.preventDefault();
	}, false);
    
    //Wyrysuj logo silnika
    _g.runGame();

});