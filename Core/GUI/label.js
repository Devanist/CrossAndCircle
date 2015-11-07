define(['Core/GUI/init'], function(GUI){
	
	/**
    Konstruktor - tworzy obiekt klasy Label.
    Klasa Label jest pochodną klasy GUI.
    @constructor
    @param {double} x - Współrzędna x elementu
    @param {double} y - Współrzędna y elementu
    @param {double} w - Szerokosć elementu
    @param {double} h - Wysokosc elementu
    @param {int} width - szerokość okna
    @param {int} height - wysokość okna
    @param {string} color - kolor czcionki
    @param {string} text - Tekst do wyświetlenia
    @param {int} fontSize - Rozmiar czcionki
    */
    var Label = function(x, y, w, h, width, height, color, text, fontSize){
        GUI.call(this, x, y, w, h, width, height, null, color, "label");
        this._text = text;
        this._fontSize = fontSize;
    };
    
    Label.prototype = Object.create(GUI.prototype, {
        constructor:{
            value: Label,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    var _p = Label.prototype;
    /**
     * Funkcja zwracająca tekst etykiety
     */
    _p.getText = function() {
        return this._text;
    };
    
    /**
     * Funkcja zmieniająca wartość pola text
     * @param {string} txt - Tekst do wyświetlenia
     */
    _p.setText = function(txt){
        this._text = txt;
    };
    
    /**
        Funkcja zwracająca rozmiar czcionki etykiety.
        @returns {double}
     */
     _p.getFontSize = function(){
         return this._fontSize;
     };
    
    return Label;
	
});