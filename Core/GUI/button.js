define(['Core/GUI/init'], function(GUI){
	
	/**
	    Konstruktor - tworzy button.
	    Klasa Button jest pochodną klasy GUI. Parametr color konstruktora klasy nadrzędnej jest wpisywany
	    statycznie w ten konstruktor celem ujednolicenia interfejsu użytkownika.
	    @constructor
	    @param {double} x - Współrzędna x elementu
	    @param {double} y - Współrzędna y elementu
	    @param {double} w - Szerokosć elementu
	    @param {double} h - Wysokosc elementu
	    @param {int} width - szerokość okna
	    @param {int} height - wysokość okna
	    @param {Requester~requestCallback} foo - Funkcja mająca zostać wywołana po uzyciu tego elementu
	*/
	var Button = function(x, y, w, h, width, height, foo, text){
        GUI.call(this, x, y, w, h, width, height, foo, "grey", "button");
	    this._text = text;
	};
    
    Button.prototype = Object.create(GUI.prototype, {
        
        constructor: {
            value: Button,
            enumerable: false,
            writable: true,
            configurable: true
        }

    });
    
    var _p = Button.prototype;
    
    /**
        Funkcja wyzwala metodę podaną jako callback przycisku.
    */
    _p.onClick = function(){
        this._onClick();
    };
    
    /** 
        Funkcja zwracając wartość pola text.
     */
    _p.getText = function(){
        return this._text;
    };

    return Button;
	
});