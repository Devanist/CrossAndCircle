requirejs(['rConfig', 
	'Game/game', 
	'Core/GfxRenderer', 
	'Game/gamelogic',
	'Core/SoundController'],
	function(rcfg, Game, GfxRenderer, Logic, SoundController){

	//Tworzenie instancji klas
	var _g = new Game(document.getElementById('mainCanvas'), "Monoglyceride");
	var _gfxr = new GfxRenderer(_g.getContext2D(), _g.getWidth(), _g.getHeight(), _g.getFont());
	var _logic = new Logic();
	var _sctrl = new SoundController();
	
	_g.setRenderer(_gfxr);
	_g.setLogic(_logic);
	_g.setSoundController(_sctrl);

	//Dodanie graczy do gry
	_logic.addPlayer("Red");
	_logic.addPlayer("Green");

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

	_g.setUpScreen();

	//Renderowanie
	_g.renderScreen();
	_g.renderGUI();

});