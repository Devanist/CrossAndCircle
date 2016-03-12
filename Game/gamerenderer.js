define([
    'WalrusEngine/Core/GfxRenderer',
    'Game/gamelogic'
    ], 
    function(GfxRenderer, Logic){
    
    var GameRenderer = function(ctx, w, h, font, fontSize){
        GfxRenderer.call(this, ctx, w, h, font, fontSize);
    };
    
    GameRenderer.prototype = Object.create(GfxRenderer.prototype, {
        
        constructor: {
            value: GameRenderer,
            enumerable: false,
            writable: true,
            configurable: true
        }
        
    });
    
    var _p = GameRenderer.prototype;
    
    /**
        Funkcja rysująca mapę gry - dwie pionowe i dwie poziome linie.
        @param {double} verticalSize - okresla wysokosc na ktorej funkcja powinna zaczac rysowanie linii
        @param {double} horizontalSize - okresla szerokosc na ktorej funkcja powinna zaczac rysowanie linii
    */
    _p.renderMap = function (verticalSize, horizontalSize) {

        var squares = {};
        this._ctx.strokeStyle = "grey";
    
        //Lewa, pionowa linia
        this._ctx.beginPath();
        this._ctx.moveTo(horizontalSize * this._w, verticalSize * this._h * 0.8);
        this._ctx.lineTo(horizontalSize * this._w, verticalSize * this._h * 2.3);
        this._ctx.stroke();

        squares.top = verticalSize * this._h * 0.8;
        squares.bottom = verticalSize * this._h * 2.3;
        squares.leftVertical = horizontalSize * this._w;
    
        //Prawa pionowa linia
        this._ctx.beginPath();
        this._ctx.moveTo(horizontalSize * this._w * 2, verticalSize * this._h * 0.8);
        this._ctx.lineTo(horizontalSize * this._w * 2, verticalSize * this._h * 2.3);
        this._ctx.stroke();

        squares.rightVertical = horizontalSize * this._w * 2;
    
        //Wyzsza pozioma linia
        this._ctx.beginPath();
        this._ctx.moveTo(0, verticalSize * this._h * 1.3);
        this._ctx.lineTo(this._w, verticalSize * this._h * 1.3);
        this._ctx.stroke();

        squares.upperHorizontal = verticalSize * this._h * 1.3;
    
        //Nizsza pozioma linia
        this._ctx.beginPath();
        this._ctx.moveTo(0, verticalSize * this._h * 1.8);
        this._ctx.lineTo(this._w, verticalSize * this._h * 1.8);
        this._ctx.stroke();

        squares.lowerHorizontal = verticalSize * this._h * 1.8;

        return squares;

    };
    
    /**
        Funkcja rysująca menu - Funkcja rysuje elementy menu
        @param {double} fontSize - Rozmiar czcionki względem wysokosci ekranu
    */
    _p.renderMenu = function (fontSize) {
    
        //Napis Cross
        this._ctx.fillStyle = "red";
        this._ctx.font = (fontSize + 0.06) * this._h + this._font;
        this._ctx.fillText("Cross", 0.35 * this._w, 0.25 * this._h);
    
        //Znak "&"
        var grd = this._ctx.createLinearGradient(0.46 * this._w, 0.38 * this._h, 0.46 * this._w + 4, 0.38 * this._h + 4);
        grd.addColorStop(0.000, 'red');
        grd.addColorStop(0.815, 'green');
        this._ctx.fillStyle = grd;
        this._ctx.font = (fontSize + 0.06) * this._h + this._font; //Większa czcionka
        this._ctx.fillText("&", 0.46 * this._w, 0.38 * this._h);
    
        //Napis Circle
        this._ctx.fillStyle = "green";
        this._ctx.font = (fontSize + 0.06) * this._h + this._font;
        this._ctx.fillText("Circle", 0.5 * this._w, 0.5 * this._h);

    };
    
    /**
     * Funkcja rysująca na ekranie krzyżyk bądź kółko
     * @param {integer} w Wiersz w którym wyrysowany zostanie symbol
     * @param {integer} k Kolumna w której wyrysowany zostanie symbol
     * @param {integer} player Gracz, którego symbol zostanie wyrysowany na mapie
     * @param {object} squares Obiekt z danymi o planszy 
    */
    _p.renderSign = function (w, k, player, squares) {
    
        //Wysokość jednego pola.
        var height = (squares.bottom - squares.top) / 3;
        //Szerokość jednego pola.
        var width = this._w / 3;
    
        //Rysowanie X
        if (player == Logic.RED) {

            this._ctx.strokeStyle = "red";
            this._ctx.beginPath();
            this._ctx.moveTo(0 + 0.05 * this._w + width * k, squares.top + 0.02 * this._h + height * w);
            this._ctx.lineTo(0 + 0.28 * this._w + width * k, squares.top + 0.15 * this._h + height * w);
            this._ctx.stroke();

            this._ctx.beginPath();
            this._ctx.moveTo(0 + 0.28 * this._w + width * k, squares.top + 0.02 * this._h + height * w);
            this._ctx.lineTo(0 + 0.05 * this._w + width * k, squares.top + 0.15 * this._h + height * w);
            this._ctx.stroke();
        }
        //Rysowanie O
        else if (player == Logic.GREEN) {
            this._ctx.strokeStyle = "green";
            this._ctx.beginPath();
            this._ctx.arc(0 + 0.165 * this._w + width * k, squares.top + 0.085 * this._h + height * w, height * 0.4, 0, 2 * Math.PI);
            this._ctx.stroke();

        }
    };
    
    return GameRenderer;
    
});