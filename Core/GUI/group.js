define(['Core/GUI/init.js'], function(GUI){

	/**
	 * Klasa grupująca elementy GUI, które NIE są względne wobec siebie.
	 * Elementy rozróżniane są nazwami (String).
	 */
	var GUIElementsGroup = function(){
		
		this._elements = {};
		
	};
	
	GUIElementsGroup.prototype = {
		
		/**
		 * Metoda dodaje element do grupy, jeśli nie istnieje w niej inny o tej samej nazwie.
		 * @param {String} name Nazwa elementu
		 * @param {GUI} element Element GUI
		 */
		addElement : function(name, element){
			if(this._elements[name] !== null && this._elements !== undefined){
				this._elements[name] = element;
			}
			else{
				console.error("Element with name " + name + " already exists!");
			}
		},
		
		/**
		 * Metoda usuwająca wszystkie elementy z danej grupy.
		 */
		deleteAllElements : function(){
			this._elements = {};
		},
		
		/**
		 * Metoda usuwająca dany element z grupy.
		 * @param {String} name Nazwa usuwanego elementu
		 */
		deleteElement : function(name){
			if(this._elements[name]){
				this._elements[name] = null;
			}
			else{
				console.error("Element with name " + name + " don't exist in this group.");
			}
		},
        
        /**
         * Metoda wywołująca funkcję update u wszystkich elementów należących do tej grupy.
         * @param {int} w Szerokość okna
         * @param {int} h Wysokość okna
         */
        update : function(w,h){
            var l = this._elements.length;
            for(var i = 0; i < l; i++){
                this._elements[i].update(w,h);
            }
        },
        
        getElement : function(el){
            return this._elements[el];
        },
        
        length : function(){
            return this._elements.length;
        },
        
        getType : function(){
            return "group";
        }
		
	};
	
	return GUIElementsGroup;
	
});