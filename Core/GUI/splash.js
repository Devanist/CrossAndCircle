define(['Core/GUI/init'], function (GUI) {

	/**
	 * @param {obj} secondColor Obiekt zawierający informację o kolorach (r,g,b).
	 */
	var Splash = function(color, secondColor){
        console.log("constructor");
		GUI.call(this, 0, 0, 0, 0, 0, 0, null, color, "splash");
		this._secondColor = secondColor;
	}
	
	Splash.prototype = Object.create(GUI.prototype, {
        constructor:{
            value: Splash,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    var _p = Splash.prototype;

	_p.getSecondColor = function () {
		return 'rgba(' + this._secondColor.r + ',' + this._secondColor.g + ',' + this._secondColor.b + ',0)';
	};

    return Splash;
});