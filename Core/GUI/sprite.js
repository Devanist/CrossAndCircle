define(['Core/GUI/init'], function(GUI){
    
    /**
     * Klasa Sprite jest pochodną klasy GUI.
     * @constructor
     */
    var Sprite = function(x, y, w, h, width, height, sprite){
        GUI.call(this, x, y, w, h, width, height, null, null, "sprite");
        this._asset = sprite;
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
    
    return Sprite;
    
});