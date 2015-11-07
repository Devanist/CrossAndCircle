define([],function(){
	
	var SCEvent = (function(){
		if(document.all){
			var Event = document.createEvent("screenChanged");
			Event.initEvent("custom", true, true);
		}
		else if(!document.all){
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