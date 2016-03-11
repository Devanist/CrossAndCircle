define(['Core/GUI/init.js'], function(GUI){

	/**
	 * Klasa grupująca elementy GUI, które NIE są względne wobec siebie.
	 * Elementy rozróżniane są nazwami (String).
	 */
	var GUIElementsGroup = function(){
		
		this._elements = [];
        this._names = [];
        this._length = 0;
		
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
                this._names.push(name);
                this._length++;
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
            this._names = [];
            this._length = 0;
		},
		
		/**
		 * Metoda usuwająca dany element z grupy.
		 * @param {String} name Nazwa usuwanego elementu
		 */
		deleteElement : function(name){
            var index = this._names.indexOf(name);
			if(this._elements[name] || index !== -1){
				this._elements[name] = null;
                delete this._elements[name];
                this._names.splice(index, 1);
                this._length--;
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
            for(var key in this._elements){
                if(this._elements.hasOwnProperty(key)){
                    this._elements[key].update(w,h);
                }
            }
        },
        
        /**
         * Metoda zwracająca żądany element GUI
         * @param {string} el Nazwa żądanego elementu
         * @param {int} el Indeks żądanego elementu
         * @returns {object}
         */
        getElement : function(el){
            if(typeof(el) === "string"){
                return this._elements[el];
            }
            else if(typeof(el) === "number"){
                return this._elements[this._names[el]];
            }
        },
        
        /**
         * Metoda zwraca ilość znajdujących się w tej grupie elementów.
         * Nie liczy elementów w zagnieżdżonych grupach.
         * @returns {int}
         */
        length : function(){
            return this._length;
        },
        
        /**
         * Metoda zwraca string "group", aby mogła być wykorzysytywana jako element GUI
         */
        getType : function(){
            return "group";
        },
        
        /**
         * Metoda sprawdza na obszarze którego, ze znajdujących się w tej grupie elementów, nastąpiło kliknięcie.
         */
        checkIfElementClicked : function(x, y, e){
            for(var key in this._elements){
                if(this._elements.hasOwnProperty(key)){
                    this._elements[key].checkIfElementClicked(x, y, e);
                }
            }
        }
		
	};
	
	return GUIElementsGroup;
	
});