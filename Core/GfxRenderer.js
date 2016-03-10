define(['Game/gamelogic'], function (Logic) {
	
	/**
		Konstruktor - tworzy obiekt klasy GfxRenderer. Program moze zawierac kilka obiektów tej klasy, jesli uzywa kilku canvasów.
		@constructor
		@param {canvas.context} ctx - Pole context obsługiwanego obiektu canvas
		@param {double} w - Szerokosc obiektu canvas
		@param {double} h - Wysokosc obiektu canvas
	*/
	var GfxRenderer = function (ctx, w, h, font, fontSize) {
		this._ctx = ctx;
		this._w = w;
		this._h = h;
		this._font = font;
        this._fontSize = fontSize;
	};

	GfxRenderer.prototype = {
		
		/**
			Funkcja zwracająca szerokość obiektu canvas.
			@returns {double}
		*/
		getW: function () {
			return this._w;
		},
		
		/**
			Funkcja zwracająca wysokość obiektu canvas.
			@returns {double}
		*/
		getH: function () {
			return this._h;
		},
		
		/**
			Funkcja rysująca na nowo ekran po zmienieniu rozmiarów okna.
		*/
		repaint: function () {
			this._ctx.save();
			this._ctx.translate(0, 0);
			this._ctx.restore();
		},
		
		/**
			Funkcja aktualizuje obiekt o nową szerokosc i wysokosc, a nastepnie czysci ekran.
			@param {double} w - Szerokosc ekranu
			@param {double} h - Wysokosc ekranu
		*/
		update: function (w, h) {
			this.clear();
			this._w = w || this._w;
			this._h = h || this._h;
			this.repaint();
		},
		
		/**
			Funkcja czyszcząca ekran - odmalowuje całe płótno na biały kolor
            @param {String} color Kolor do czyszczenia ekranu, domyślnie biały.
		*/
		clear: function (color) {
            if(color === undefined || color === null){
                color = "white";
            }
			this._ctx.fillStyle = color;
			this._ctx.fillRect(0, 0, this._w, this._h);
		},
		
		/**
			Funkcja rysująca mapę gry - dwie pionowe i dwie poziome linie.
			@param {double} verticalSize - okresla wysokosc na ktorej funkcja powinna zaczac rysowanie linii
			@param {double} horizontalSize - okresla szerokosc na ktorej funkcja powinna zaczac rysowanie linii
		*/
		renderMap: function (verticalSize, horizontalSize) {

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

		},
		
		/**
			Funkcja rysująca przycisk.
			@param {double} fontSize - Rozmiar czcionki
			@param {Button} button - Obiekt klasy Button, logiczna interpretacja
		*/
		renderButton: function (fontSize, button) {
			this._ctx.fillStyle = "grey";
			this._ctx.beginPath();
			this._ctx.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
			this._ctx.fill();
			this._ctx.strokeStyle = "darkgrey";
			this._ctx.stroke();
			this._ctx.fillStyle = "black";
			this._ctx.font = (fontSize * this._h) + this._font;
			var x = (button.getWidth() - this._ctx.measureText(button.getText()).width) / 2;
			var y = (button.getHeight() - fontSize * this._h);
			this._ctx.fillText(button.getText(), button.getX() + x, button.getY() + y);
		},
		
		/**
			Funkcja rysująca menu - Funkcja rysuje całe menu: logo oraz przyciski
			@param {double} fontSize - Rozmiar czcionki względem wysokosci ekranu
		*/
		renderMenu: function (fontSize) {
		
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

		},
		
		/**
			Funkcja rysująca na ekranie krzyżyk
			@param {integer} w - Wiersz w którym wyrysowany zostanie krzyżyk
			@param {integer} k - Kolumna w której wyrysowany zostanie krzyżyk
		*/
		renderSign: function (w, k, player, squares) {
		
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
		},
		
		/**
		 * Funkcja renderująca na ekranie wskazaną etykietę
		 * @param {double} fontSize - rozmiar czcionki do wyświetlenia
		 * @param {label} label - etykieta do wyświetlenia
		 */
		renderLabel: function (fontSize, label) {
			this._ctx.fillStyle = label.getColor();
			var fS = label.getFontSize() || fontSize;
			this._ctx.font = (fS * this._h) + this._font;
			var x = (label.getWidth() - this._ctx.measureText(label.getText()).width) / 2;
			//var y = (label.getHeight() - fontSize * this._h);
			this._ctx.fillText(label.getText(), label.getX() + x, label.getY());
		},
		
		/**
		 * Funkcja wyświetlająca na ekranie pionowy gradient.
		 * @param {splash} splash - gradient do wyświetlenia
		 */
		renderSplash: function (splash) {
			var gradient = this._ctx.createLinearGradient(0, 0, 0, this._h);
			gradient.addColorStop(0, splash.getSecondColor());
			gradient.addColorStop(2 / 5, splash.getColor());
			gradient.addColorStop(3 / 5, splash.getColor());
			gradient.addColorStop(1, splash.getSecondColor());
			this._ctx.fillStyle = gradient;
			this._ctx.fillRect(0, 0, this._w, this._h);
		},
        
        /**
         * Funkcja wyświetlająca na ekranie wskazany sprite
         * @param {sprite} sprite - sprite do wyświetlenia
         */
        renderSprite: function(sprite){
            this._ctx.drawImage(sprite.getAsset(), sprite.getX(), sprite.getY());
        },
        
        /**
         * Funkcja wyświetla animację zanikania w danym kolorze.
         * @param {object} position Obiekt zawierający informację o polu jakie ma zostać objęte animacją (x,y,w,h).
         * @param {object} color Obiekt zawierający informację o składowych koloru (r,g,b).
         * @param {int} time Czas w ms, w jakim ma zostać wykonana animacja, domyślnie 3000.
         */ 
        fadeOut: function(position, color, time){
		
		time = time || 3000;

		var that = this;
        	var alpha = 0.0;
        	var rgb = "rgba(" + color.r + ", " + color.g + ", " + color.b + ",";
        	var timeDiff = 16.6; //Aby wartość fps wynosiła 60
        	var alphaDiff = 1 / (time / 16.6); // 1 / liczba klatek
        	
        	var displayFrame = function(){
        		
        		that._ctx.fillStyle = rgb + alpha + ")";
        		that._ctx.fillRect(position.x, position.y, position.w, position.h);

        		if(alpha === 1){
        			return;
        		}
        		
        		alpha += alphaDiff;
        		
        		if(alpha > 1){
        			alpha = 1;
        		}
        		
        		
        		setTimeout(displayFrame, timeDiff);
        	};
        	
        	setTimeout(displayFrame,timeDiff);

        },
        
        /**
         * Funkcja wyświetla animację pojawiania w danym kolorze.
         * @param {object} position Obiekt zawierający informację o polu jakie ma zostać objęte animacją (x,y,w,h). Jeżeli ma być to cały ekran, można użyć stringa "all".
         * @param {object} color Obiekt zawierający informację o składowych koloru (r,g,b).
         * @param {int} time Czas w ms, w jakim ma zostać wykonana animacja, domyślnie 3000.
         */ 
        fadeIn : function(position, color, time){
        	
        	time = time || 3000;
        	
        	if(typeof(position) === "string" && position === "all"){
        		position.x = 0;
        		position.y = 0;
        		position.w = this._w;
        		position.h = this._h;
        	}

		var that = this;
        	var alpha = 0.0;
        	var rgb = "rgba(" + color.r + ", " + color.g + ", " + color.b + ",";
        	var timeDiff = 16.6; //Aby wartość fps wynosiła 60
        	var alphaDiff = 1 / (time / 16.6); // 1 / liczba klatek
        	
        	var displayFrame = function(){
        		
        		that._ctx.fillStyle = rgb + alpha + ")";
        		that._ctx.fillRect(position.x, position.y, position.w, position.h);
        		
        		if(alpha === 0){
        			return;
        		}
        		
        		alpha -= alphaDiff;
        		
        		if(alpha < 0){
        			alpha = 0;
        		}
        		
        		setTimeout(displayFrame, timeDiff);
        	};
        	
        	setTimeout(displayFrame, timeDiff);
        	
        },
        
        renderGroup : function(group){
            var l = group.length();
            var el = null;
            for(var i = 0; i < l; i++){
                el = group.getElement(i);
                if(el.getType() === "sprite"){
                    this.renderSprite(el);
                }
                else if(el.getType() === "splash"){
                    this.renderSplash(el);
                }
                else if(el.getType() === "label"){
                    this.renderLabel(this._fontSize, el);
                }
                else if(el.getType() === "button"){
                    this.renderButton(this._fontSize, el);
                }
                else if(el.getType() === "group"){
                    this.renderGroup(el);
                }
            }
        }
        
	};

	return GfxRenderer;

});
