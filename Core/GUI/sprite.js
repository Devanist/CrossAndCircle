define(['Core/GUI/init'], function(GUI){
    
    /**
     * Klasa Sprite jest pochodną klasy GUI.
     * @constructor
     * @param {object} position Obiekt przechowujący informacje o pozycji sprite'a na ekranie (x,y,w,h)
     */
    var Sprite = function(position, size, width, height, sprite){
        
        if(typeof(position) === "string"){
            if(position === "CENTER"){
                var temp = position;
                position = {};
                position.textValue = temp;
                position.x = (width / 2) - (size.w / 2);
                position.y = (height / 2) - (size.h / 2);
            }
        }

        GUI.call(this, position.x, position.y, size.w, size.h, width, height, null, null, "sprite");
        this._asset = sprite;
        this._position = position.textValue;
        this._realX = this._x;
        this._realY = this._y;
        this._realW = this._w;
        this._realH = this._h;
    };
    
    Sprite.prototype = Object.create(GUI.prototype, {
        constructor:{
            value: Sprite,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    var _p = Sprite.prototype;
    
    _p.getAsset = function(){
        return this._asset;
    };
    
    _p.update = function(width, height){

        if(this._position === "CENTER"){
            this._realX = (width / 2) - (this._realW / 2);
            this._realY = (height / 2) - (this._realH / 2);            
        }
        else{
            this._realX = this._x * width;
            this._realY = this._y * height;
            
            this._endPosX = this._realX + this._realW;
            this._endPosY = this._realY + this._realH;
        }

    };
    
    return Sprite;
    
});