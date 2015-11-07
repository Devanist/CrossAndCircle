define([],function(){
	
	var isTouchDevice = function(){
        return ('ontouchstart' in document.documentElement);
    };
	
	return isTouchDevice;
	
})