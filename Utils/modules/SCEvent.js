define([],function(){
	
	var SCEvent = (function(){
		if(window.navigator.userAgent.indexOf("MSIE ") > 0 || 
            window.navigator.userAgent.indexOf("Trident/") > 0){
			var Event = document.createEvent("CustomEvent");
			Event.initCustomEvent("screenChanged", true, true, null);
		}
		else{
			Event = new CustomEvent(
				"screenChanged", {
					detail: null,
					bubbles: true,
					cancelable: true
				}
			);
		}
		
		return Event;
	})();
		
	return SCEvent;	
	
})