define([], function(){

    /**
        Konstruktor - tworzy element GUI - graficznego interfejsu uzytkownika - zarówno od strony logicznej jak i graficznej.
        Odrysowanie nastepuje poprzez klasę GfxRenderer.
        Pole kolor uzupełniamy sami wpisując je statycznie w definicji konstruktora klasy pochodnej,
        celem ujdenolicenia interfejsu użytkownika.
        @constructor
        @param {double} x - Współrzędna procentowa x elementu
        @param {double} y - Współrzędna procentowa y elementu
        @param {double} w - Procentowa szerokosć elementu
        @param {double} h - Procentowa wysokosc elementu
        @param {int} width - szerokość okna
        @param {int} height - wysokość okna
        @param {Requester~requestCallback} foo - Funkcja mająca zostać wywołana po uzyciu tego elementu
        @param {string} etype - Typ elementu gui, powinien być wpisywany tylko w konstruktorze klasy.
    */
    var GUI = function(x, y, w, h, width, height, foo, color, etype){
        //Proporcje
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        //Rzeczywiste wartości
        this._realX = this._x * width;
        this._realY = this._y * height;
        this._realW = this._w * width;
        this._realH = this._h * height;
        this._endPosX = this._realX + this._realW;
        this._endPosY = this._realY + this._realH;
        this._color = color;
        this.callback = foo;
        this._type = etype;
    };

    GUI.prototype = {
        
        /**
            Funkcja zwraca typ elementu GUI
            returns {string}
        */
        getType : function(){
            return this._type;
        },
        
        /**
            * Funkcja zwracająca kolor etykiety.
            * @returns {string}
        */
        getColor : function(){
            return this._color;
        },
        
        /**
            Na nowo oblicza pozycje i rozmiary elementów GUI po zmianie rozmiaru okna.
            @param {int} width - Szerokość okna
            @param {int} height - Wysokość okna
        */
        update : function(width, height){
            this._realX = this._x * width;
            this._realY = this._y * height;
            this._realW = this._w * width;
            this._realH = this._h * height;
            this._endPosX = this._realX + this._realW;
            this._endPosY = this._realY + this._realH;
        },
        
        /**
            Funkcja zwracająca współrzędną x lewego, górnego rogu elementu
            @returns {double} x
        */
        getX : function(){
            return this._realX;
        },
        /**
            Funkcja zwracająca współrzędną y lewego, górnego rogu elementu
            @returns {double} y
        */
        getY : function(){
            return this._realY;
        },
        
        /**
            Funkcja zwracająca współrzędną x prawego, dolnego rogu elementu
            @returns {double} endPosX
        */
        getEndX : function(){
            return this._endPosX;
        },
        
        /**
            Funkcja zwracająca współrzędną y prawego, dolnego rogu elementu
            @returns {double} endPosY
        */
        getEndY : function(){
            return this._endPosY;
        },
        
        /**
            Funkcja zwraca szerokość elementu GUI
            @returns {double} w
        */
        getWidth : function(){
            return this._realW;
        },
        
        /**
            Funkcja zwraca wysokość elementu GUI
            @returns {double} h
        */
        getHeight : function(){
            return this._realH;
        },
        
        /**
            Funkcja przemieszcza element na podane współrzędne x,y
            @param {double} x - Współrzędna x, domyślnie poprzednia wartość
            @param {double} y - Współrzędna y, domyślnie poprzednia wartość
        */
        move : function(x,y){
            var w = this._realX / this._x;
            var h = this._realY / this._y;
            this._x = x || this._x;
            this._y = y || this._y;
            this.update(w,h);
        },
        
        /**
            Funkcja zmienia rozmiar elementu GUI
            @param {double} w - Szerokość elementu
            @param {double} h - Wysokość elementu
        */
        resize : function(w,h){
            var width = this._realX / this._x;
            var height = this._realY / this._y;
            this._w = w || this._w;
            this._h = h || this._h;
            this.update(width, height);
        },
        
        /**
         * Metoda uruchamia funkcję podaną jako callback elementu.
         * @param {obj} args Obiekt z argumentami dla funkcji callback
         */ 
        runCallback : function(args){
            if(this.callback !== null && this.callback != "undefined"){
                this.callback(args);
            }
        },
        
        /**
         * Metoda sprawdza czy kliknięcie nastąpiło w obszarze zajmowanym przez dany element
         * @param {int} x Współrzędna x kliknięcia
         * @param {int} y Współrzędna y kliknięcia
         * @param {object} e Obiekt zdarzenia kliknięcia
         */
        checkIfElementClicked : function(x, y, e){
            if(x >= this._realX &&
               x <= this._realX + this._realW &&
               y >= this._realY &&
               y <= this._realY + this._realH
              ){
                this.runCallback(e);
            }
        }
        

    };
 
    return GUI;
 
 });