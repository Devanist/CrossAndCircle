define([
    'Utils/init',
    'Game/gameplayer'
    ], function(Utils, Player){
    
    /**
       Konstruktor klasy Logic, zawierającej całą logikę, zasady gry.
        @constructor
    */
    var LogicCore = function(){
        this._currentScreen = -1;
        this._players = {};
        this._currentPlayer = 0;
        this._state = 0;
    };

    LogicCore.prototype = {
        
        /**
            Funkcja zwracająca obecny stan aplikacji.
            @returns {int}
         */
        getState : function(){
            return this._state;
        },
        
        /**
            Funkcja resetująca stan logiki.
         */
        resetLogic : function(){
            
        },
        
        /**
            Funkcja zmieniająca stan aplikacji.
            @param {int} state - Stan aplikacji
         */
         setState : function(state){
             this._state = state;
         },

        /**
            Funkcja zwraca aktualnie aktywnego gracza
        */
        currentPlayer : function(){
            return this._currentPlayer;
        },
        
        /**
            Zwraca informację o tym, jaki ekran użytkownik w tej chwili powinien widzieć.
            @returns {int}
        */
        currentScreen : function(){
            return this._currentScreen;
        },
        
        /**
            Zmienia wyświetlany ekran na podany jako argument.
            @param {int} SCREEN
        */
        setScreen : function(SCREEN){
            this._currentScreen = SCREEN;
            document.dispatchEvent(Utils.SCEvent);
        },
        
        /**
         * Dodaje gracza do listy graczy.
         * @param {string} name - Nazwa gracza
         * @param {object} player - Obiekt przechowujący informacje o graczu
         */
        addPlayer : function(name){
            this._players[name] = new Player(name);
        },

        /**
         * Funkcja zwraca gracza o podanej nazwie
         * @param {string} name - Nazwa zwracanego gracza
         */
        getPlayer: function(name){
            return this._players[name];
        }
    };
    
    return LogicCore;
 
 });