/*=============================================
METODOS DEL OBJETO JUEGO
=============================================*/

var juego = {

	teclado: function(){

		/*=============================================
		EVENTOS TECLADO
		=============================================*/

		document.addEventListener("keydown", juego.oprimir)
		document.addEventListener("keyup", juego.soltar)

	},

	oprimir: function(tecla){

		/*=============================================
		OPRIMIR TECLADO
		=============================================*/
		tecla.preventDefault();
		if(tecla.keyCode == 37){datos.izquierda = true;}
		if(tecla.keyCode == 39){datos.derecha = true;}
		if(tecla.keyCode == 38){datos.salto = true;}
		if(tecla.keyCode == 32){datos.disparo = true;
								datos.disparo_y = datos.jugador_y;
								datos.movDisparoJugador = 0;
								datos.imgDisparoJugador.src = "views/img/utileria/balasJugador.png";
								datos.disparo_ancho = 15;
								datos.disparo_alto = 15;
							}

	},

	soltar: function(tecla){

		/*=============================================
		SOLTAR TECLADO
		=============================================*/
		tecla.preventDefault();
		if(tecla.keyCode == 37){datos.izquierda = false; datos.imgJugador.src = "views/img/jugador/stop_left.png";}
		if(tecla.keyCode == 39){datos.derecha = false; 	datos.imgJugador.src = "views/img/jugador/stop_right.png";}
		if(tecla.keyCode == 38){datos.salto = false;}
		if(tecla.keyCode == 32){datos.disparo = false;}

	},

	tiempo: function(){

		/*=============================================
		LLAMADO DEL CANVAS
		=============================================*/	

		lienzo.canvas();

		/*=============================================
		CICLO DEL SPRITE
		=============================================*/	

		if(datos.cicloSprite >= 500){datos.cicloSprite = 0;}else{datos.cicloSprite+=20}

		for(var i = 0; i <= datos.cicloSprite; i+=100){

			if(datos.cicloSprite >= i){datos.sprite_x = i}

		}

		/*=============================================
		CICLO TRAMPAS
		=============================================*/	

		if(datos.movTrampas <= 0){datos.cambioMovTrampas = false}
		if(datos.movTrampas >= 100){datos.cambioMovTrampas = true}

		if(!datos.cambioMovTrampas){datos.movTrampas++}
		else{datos.movTrampas--}
		
		/*=============================================
		MOVIMIENTO HORIZONTAL ESCENARIO
		=============================================*/	

		datos.desplazamientoEscenario += datos.movimiento;

		/*=============================================
		MOVIMIENTO HORIZONTAL JUGADOR
		=============================================*/	

		if(datos.desplazamientoEscenario <= datos.limiteEscenario){

			datos.jugador_x += datos.movimientoJugador;
		}

		/*=============================================
		MOVIMIENTO HORIZONTAL PLATAFORMA
		=============================================*/	

		for(var i = 0; i < datos.plataforma.length; i++){

			datos.plataforma[i].x += datos.movimiento;
		}

		/*=============================================
		MOVIMIENTO HORIZONTAL MONEDAS
		=============================================*/	

		for(var i = 0; i < datos.posMonedas.length; i++){

			datos.posMonedas[i].x += datos.movimiento;
		}

		/*=============================================
		MOVIMIENTO HORIZONTAL TRAMPAS
		=============================================*/	

		for(var i = 0; i < datos.posTrampas.length; i++){

			datos.posTrampas[i].x += datos.movimiento;
		}

		/*=============================================
		MOVIMIENTO HORIZONTAL ENEMIGOS
		=============================================*/	

		for(var i = 0; i < datos.posEnemigos.length; i++){

			datos.posEnemigos[i].x += datos.movimiento;
		}

		/*=============================================
		MOVIMIENTO HORIZONTAL BALAS ENEMIGOS
		=============================================*/	

		for(var i = 0; i < datos.posBalasEnemigos.length; i++){

			datos.posBalasEnemigos[i].x += datos.movimiento;
		}

		/*=============================================
		MOVIMIENTO IZQUIERDA
		=============================================*/	

		if(datos.izquierda){

			datos.direccionJugador = "izquierda";			

			if(datos.desplazamientoEscenario >= 0){

				datos.movimiento = 0;

			}else if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				if(datos.jugador_x <= 70){

					datos.movimiento = datos.velocidad;
				
				}else{

					datos.movimiento = 0;
					datos.movimientoJugador =  -datos.velocidad;
				}


			}else{

				datos.movimiento = datos.velocidad;

			}

			if(datos.gravedad == 0){

				datos.imgJugador.src = "views/img/jugador/run_left.png";
			}

			if(datos.salto && datos.gravedad == 0){

				datos.imgJugador.src = "views/img/jugador/jump_left.png";
			}
	
		}

		/*=============================================
		MOVIMIENTO DERECHA
		=============================================*/	
		if(datos.derecha){

			datos.direccionJugador = "derecha";	

			if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				datos.movimiento = 0;
			    datos.movimientoJugador =  datos.velocidad;

			}else{
				
				datos.movimiento = -datos.velocidad;

			}

			if(datos.gravedad == 0){

				datos.imgJugador.src = "views/img/jugador/run_right.png";
			}

			if(datos.salto && datos.gravedad == 0){

				datos.imgJugador.src = "views/img/jugador/jump_right.png";
			}
			
		}

		/*=============================================
		DETENIENDO MOVIMIENTO ESCENARIO Y MOVIMIENTO JUGADOR
		=============================================*/	

		if(!datos.izquierda && !datos.derecha){datos.movimiento = 0; datos.movimientoJugador = 0;}

		/*=============================================
		GRAVEDAD
		=============================================*/

		datos.jugador_y += datos.gravedad;

		if(datos.gravedad < datos.limiteGravedad){

			datos.gravedad += datos.peso;
		}

		/*=============================================
		COLISIONES CON PLATAFORMA
		=============================================*/	

		for(var i = 0; i < datos.plataforma.length; i++){

			function colisionesPlataforma(){

				//No colisión con plataforma de Arriba hacia Abajo
				if((datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y){return false}

				//No colisión con plataforma de Abajo hacia Arriba
				if(datos.jugador_y > (datos.plataforma[i].y + datos.plataforma[i].alto)){return false}

				//No colisión con plataforma de Izquierda a Derecha
				if((datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x){return false}

				//No colisión con plataforma de Derecha a Izquierda
				if(datos.jugador_x > (datos.plataforma[i].x + datos.plataforma[i].ancho)){return false}

				return true;
			
			}

			colisionesPlataforma();

			//Colisión con plataforma de Arriba hacia Abajo

			if(colisionesPlataforma() && (datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y + datos.gravedad){

				datos.gravedad = 0;
				datos.jugador_y = datos.plataforma[i].y - datos.jugador_alto;
			}

			//Colisión con plataforma de Abajo hacia Arriba

			if(colisionesPlataforma() && datos.jugador_y - datos.gravedad > (datos.plataforma[i].y + datos.plataforma[i].alto)){

				datos.gravedad = 1;
				datos.jugador_y = datos.plataforma[i].y + datos.plataforma[i].alto;
			}

			if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				//Colisión con plataforma de Izquierda a derecha

				if(colisionesPlataforma() && (datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x + datos.movimientoJugador){

					datos.movimientoJugador = 0;
					datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;
				}

				//Colisión con plataforma de Derecha a Izquierda

				if(colisionesPlataforma() && datos.jugador_x - datos.movimientoJugador > (datos.plataforma[i].x + datos.plataforma[i].ancho)){

					datos.movimientoJugador = 0;
					datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;
				}

			}else{

				//Colisión con plataforma de Izquierda a derecha

				if(colisionesPlataforma() && (datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x - datos.movimiento){

					datos.movimiento = 0;
					datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;
				}

				//Colisión con plataforma de Derecha a Izquierda

				if(colisionesPlataforma() && datos.jugador_x + datos.movimiento > (datos.plataforma[i].x + datos.plataforma[i].ancho)){

					datos.movimiento = 0;
					datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;
				}


			}

			/*=============================================
			SALTO
			=============================================*/	
			if(datos.salto && datos.gravedad == 0 && datos.jugador_y == datos.plataforma[i].y - datos.jugador_alto){

				datos.gravedad = datos.alturaSalto;
			}


		}

		/*=============================================
		COLISIONES CON MONEDAS
		=============================================*/	

		for(var i = 0; i < datos.posMonedas.length; i++){

			function colisionMonedas(){

				//No colisión con Monedas de Arriba hacia Abajo
				if((datos.jugador_y + datos.jugador_alto) < datos.posMonedas[i].y){return false}

				//No colisión con Monedas de Abajo hacia Arriba
				if(datos.jugador_y > (datos.posMonedas[i].y + datos.posMonedas[i].alto)){return false}

				//No colisión con Monedas de Izquierda a Derecha
				if((datos.jugador_x + datos.jugador_ancho) < datos.posMonedas[i].x){return false}

				//No colisión con Monedas de Derecha a Izquierda
				if(datos.jugador_x > (datos.posMonedas[i].x + datos.posMonedas[i].ancho)){return false}

				return true;

			}

			colisionMonedas();

			if(colisionMonedas()){

				datos.imgMonedas[i].src = "views/img/utileria/colisionesMonedas.png";
				datos.posMonedas[i].y --;

				var monedaColisionada = i;

				setTimeout(function(){

					datos.posMonedas[monedaColisionada].x = -500;
					datos.posMonedas[monedaColisionada].y = -500;

				}, 500)

			}

		}

		/*=============================================
		COLISIONES CON TRAMPAS
		=============================================*/	

		for(var i = 0; i < datos.posTrampas.length; i++){

			function colisionTrampas(){

				//No colisión con Trampas de Arriba hacia Abajo
				if((datos.jugador_y + datos.jugador_alto) < datos.posTrampas[i].y+datos.movTrampas){return false}

				//No colisión con Trampas de Abajo hacia Arriba
				if(datos.jugador_y > (datos.posTrampas[i].y+datos.movTrampas + datos.posTrampas[i].alto)){return false}

				//No colisión con Trampas de Izquierda a Derecha
				if((datos.jugador_x + datos.jugador_ancho) < datos.posTrampas[i].x){return false}

				//No colisión con Trampas de Derecha a Izquierda
				if(datos.jugador_x > (datos.posTrampas[i].x + datos.posTrampas[i].ancho)){return false}

				return true;

			}

			colisionTrampas();

			if(colisionTrampas()){

				datos.imgTrampas[i].src = "views/img/utileria/colisionesTrampas.png";
				datos.imgJugador.src = "views/img/jugador/colision_trampa.png";
			
			}else{

				datos.imgTrampas[i].src = "views/img/utileria/trampas.png";
			}

		}

		/*=============================================
		COLISIONES CON ENEMIGOS
		=============================================*/	

		for(var i = 0; i < datos.posEnemigos.length; i++){

			function colisionesEnemigos(){

				//No colisión con plataforma de Arriba hacia Abajo
				if((datos.jugador_y + datos.jugador_alto) < datos.posEnemigos[i].y){return false}

				//No colisión con plataforma de Abajo hacia Arriba
				if(datos.jugador_y > (datos.posEnemigos[i].y + datos.posEnemigos[i].alto)){return false}

				//No colisión con plataforma de Izquierda a Derecha
				if((datos.jugador_x + datos.jugador_ancho) < datos.posEnemigos[i].x){return false}

				//No colisión con plataforma de Derecha a Izquierda
				if(datos.jugador_x > (datos.posEnemigos[i].x + datos.posEnemigos[i].ancho)){return false}

				return true;
			
			}

			colisionesEnemigos();

			//Colisión con plataforma de Arriba hacia Abajo

			if(colisionesEnemigos() && (datos.jugador_y + datos.jugador_alto) < datos.posEnemigos[i].y + datos.gravedad){

				datos.gravedad = 0;
				datos.jugador_y = datos.posEnemigos[i].y - datos.jugador_alto;
			}

			//Colisión con plataforma de Abajo hacia Arriba

			if(colisionesEnemigos() && datos.jugador_y - datos.gravedad > (datos.posEnemigos[i].y + datos.posEnemigos[i].alto)){

				datos.gravedad = 1;
				datos.jugador_y = datos.posEnemigos[i].y + datos.posEnemigos[i].alto;
			}

			if(datos.desplazamientoEscenario <= datos.limiteEscenario){

				//Colisión con plataforma de Izquierda a derecha

				if(colisionesEnemigos() && (datos.jugador_x + datos.jugador_ancho) < datos.posEnemigos[i].x + datos.movimientoJugador){

					datos.movimientoJugador = 0;
					datos.jugador_x = datos.posEnemigos[i].x - datos.jugador_ancho;
				}

				//Colisión con plataforma de Derecha a Izquierda

				if(colisionesEnemigos() && datos.jugador_x - datos.movimientoJugador > (datos.posEnemigos[i].x + datos.posEnemigos[i].ancho)){

					datos.movimientoJugador = 0;
					datos.jugador_x = datos.posEnemigos[i].x + datos.posEnemigos[i].ancho;
				}

			}else{

				//Colisión con plataforma de Izquierda a derecha

				if(colisionesEnemigos() && (datos.jugador_x + datos.jugador_ancho) < datos.posEnemigos[i].x - datos.movimiento){

					datos.movimiento = 0;
					datos.jugador_x = datos.posEnemigos[i].x - datos.jugador_ancho;
				}

				//Colisión con plataforma de Derecha a Izquierda

				if(colisionesEnemigos() && datos.jugador_x + datos.movimiento > (datos.posEnemigos[i].x + datos.posEnemigos[i].ancho)){

					datos.movimiento = 0;
					datos.jugador_x = datos.posEnemigos[i].x + datos.posEnemigos[i].ancho;
				}


			}

			/*=============================================
			SALTO
			=============================================*/	
			if(datos.salto && datos.gravedad == 0 && datos.jugador_y == datos.posEnemigos[i].y - datos.jugador_alto){

				datos.gravedad = datos.alturaSalto;
			}

		}

		/*=============================================
		CICLO BALAS ENEMIGOS
		=============================================*/	

		if(datos.cicloBalasEnemigos >= 5000){datos.cicloBalasEnemigos = 0}else{datos.cicloBalasEnemigos +=20}

		for(var i = 0; i <= datos.cicloBalasEnemigos; i+= 1000){

			if(datos.cicloBalasEnemigos >= i){

				datos.cambioBalasEnemigos = true;
				
				datos.movBalasEnemigos = datos.velocidadBalasEnemigos;
			
			}

			if(datos.cicloBalasEnemigos >= i+900){

				datos.cambioBalasEnemigos = false;
				
				datos.movBalasEnemigos = 0;

			}

		}

		if(datos.cambioBalasEnemigos){

			for(var i = 0; i < datos.posBalasEnemigos.length; i++){

				datos.posBalasEnemigos[i].x -= datos.movBalasEnemigos;

			}

		}else{

			for(var i = 0; i < datos.posBalasEnemigos.length; i++){

				datos.posBalasEnemigos[i].x = datos.posEnemigos[i].x;

			}

		}

		/*=============================================
		COLISIONES CON BALAS ENEMIGOS
		=============================================*/	

		for(var i = 0; i < datos.posBalasEnemigos.length; i++){

			function colisionBalasEnemigos(){

				//No colisión con Trampas de Arriba hacia Abajo
				if((datos.jugador_y + datos.jugador_alto) < datos.posBalasEnemigos[i].y){return false}

				//No colisión con Trampas de Abajo hacia Arriba
				if(datos.jugador_y > (datos.posBalasEnemigos[i].y + datos.posBalasEnemigos[i].alto)){return false}

				//No colisión con Trampas de Izquierda a Derecha
				if((datos.jugador_x + datos.jugador_ancho) < datos.posBalasEnemigos[i].x){return false}

				//No colisión con Trampas de Derecha a Izquierda
				if(datos.jugador_x > (datos.posBalasEnemigos[i].x + datos.posBalasEnemigos[i].ancho)){return false}

				return true;

			}

			colisionBalasEnemigos();

			if(colisionBalasEnemigos()){

				datos.imgJugador.src = "views/img/jugador/colision_trampa.png";
				datos.imgBalasEnemigos.src = "views/img/utileria/colisionesBalasEnemigos.png";

				setTimeout(function(){

					datos.imgJugador.src = "views/img/jugador/stop_right.png";
					datos.imgBalasEnemigos.src = "views/img/utileria/balasEnemigos.png";

				},100)
				
			}
		}

		/*=============================================
		DISPAROS DEL JUGADOR
		=============================================*/	

		if(datos.disparo){

			datos.validarDisparo = true;

		}

		if(datos.validarDisparo){

		
			if(datos.direccionJugador == "izquierda"){

				datos.disparoIzq = true;
		        datos.disparoDer = false;

			}
			else{

				datos.disparoIzq = false;
		        datos.disparoDer = true;

			}

		}

		if(datos.disparoIzq){

			datos.validarDisparo = false;
			datos.disparo_x = datos.jugador_x + datos.movDisparoJugador;
			datos.movDisparoJugador -= datos.velocidadDisparoJugador;
		}

		if(datos.disparoDer){

			datos.validarDisparo = false;
			datos.disparo_x = datos.jugador_x + datos.movDisparoJugador;
			datos.movDisparoJugador += datos.velocidadDisparoJugador;
		}

		/*=============================================
		COLISIONES BALAS ENEMIGOS CON DISPARO JUGADOR
		=============================================*/

		for(var i = 0; i < datos.posBalasEnemigos.length; i++){

			function colisionDisparoJugador(){

				//No colisión con Trampas de Arriba hacia Abajo
				if((datos.disparo_y + datos.disparo_alto) < datos.posBalasEnemigos[i].y){return false}

				//No colisión con Trampas de Abajo hacia Arriba
				if(datos.disparo_y > (datos.posBalasEnemigos[i].y + datos.posBalasEnemigos[i].alto)){return false}

				//No colisión con Trampas de Izquierda a Derecha
				if((datos.disparo_x + datos.disparo_ancho) < datos.posBalasEnemigos[i].x){return false}

				//No colisión con Trampas de Derecha a Izquierda
				if(datos.disparo_x > (datos.posBalasEnemigos[i].x + datos.posBalasEnemigos[i].ancho)){return false}

				return true;

			}

			colisionDisparoJugador();

			if(colisionDisparoJugador()){

				datos.imgDisparoJugador.src = "views/img/utileria/colisionesBalas.png";

				datos.posBalasEnemigos[i].x = -500;
				datos.posBalasEnemigos[i].y = -500;

				datos.disparo_ancho = 50;
				datos.disparo_alto = 50;

				setTimeout(function(){

					datos.disparo_y = -500;

				},500)
				
			}
		}

		/*=============================================
		CAÍDA DEL JUGADOR POR FUERA DEL ESCENARIO
		=============================================*/	

		if(datos.jugador_y > 500){

			datos.reset = true;
		}

		/*=============================================
		RESETEAR EL NIVEL
		=============================================*/	

		if(datos.reset){

			datos.reset = false;
			datos.gravedad = 0;
			datos.desplazamientoEscenario = 0;
			datos.movimiento = 0;
			datos.jugador_y = 200;
			jugador_x = 70;

			/*=============================================
			RESET PLATAFORMA
			=============================================*/

			if(datos.nivel == 1){

			 	var xhr_plataforma = new XMLHttpRequest();
				xhr_plataforma.open("GET", "views/js/json/plataformasNivel1.json", true)

			}

			if(datos.nivel == 2){

				var xhr_plataforma = new XMLHttpRequest();
				xhr_plataforma.open("GET", "views/js/json/plataformasNivel2.json", true)  

			}

			if(datos.nivel == 3){

	      		var xhr_plataforma = new XMLHttpRequest();
				xhr_plataforma.open("GET", "views/js/json/plataformasNivel3.json", true)
			}

			xhr_plataforma.send();

			xhr_plataforma.onreadystatechange = function(){

				if ((xhr_plataforma.readyState == 4)&&(xhr_plataforma.status == 200)){

					datos.plataforma = JSON.parse(xhr_plataforma.responseText)

				}
			}

			/*=============================================
			RESET MONEDAS
			=============================================*/

			if(datos.nivel == 1){

			 	var xhr_monedas = new XMLHttpRequest();
				xhr_monedas.open("GET", "views/js/json/monedasNivel1.json", true)

			}

			if(datos.nivel == 2){

				var xhr_monedas = new XMLHttpRequest();
				xhr_monedas.open("GET", "views/js/json/monedasNivel2.json", true)  

			}

			if(datos.nivel == 3){

	      		var xhr_monedas = new XMLHttpRequest();
				xhr_monedas.open("GET", "views/js/json/monedasNivel3.json", true)
			}

			xhr_monedas.send();

			xhr_monedas.onreadystatechange = function(){

				if ((xhr_monedas.readyState == 4)&&(xhr_monedas.status == 200)){

					datos.posMonedas = JSON.parse(xhr_monedas.responseText)

					for(var i = 0; i < datos.posMonedas.length; i ++){

						datos.imgMonedas[i] = new Image();
						datos.imgMonedas[i].src = "views/img/utileria/monedas.png";
					}

				}
			}

			/*=============================================
			RESET TRAMPAS
			=============================================*/

			if(datos.nivel == 1){

			 	var xhr_trampas = new XMLHttpRequest();
				xhr_trampas.open("GET", "views/js/json/trampasNivel1.json", true)

			}

			if(datos.nivel == 2){

				var xhr_trampas = new XMLHttpRequest();
				xhr_trampas.open("GET", "views/js/json/trampasNivel2.json", true)  

			}

			if(datos.nivel == 3){

	      		var xhr_trampas = new XMLHttpRequest();
				xhr_trampas.open("GET", "views/js/json/trampasNivel3.json", true)
			}

			xhr_trampas.send();

			xhr_trampas.onreadystatechange = function(){

				if ((xhr_trampas.readyState == 4)&&(xhr_trampas.status == 200)){

					datos.posTrampas = JSON.parse(xhr_trampas.responseText)

					for(var i = 0; i < datos.posTrampas.length; i ++){

						datos.imgTrampas[i] = new Image();
						datos.imgTrampas[i].src = "views/img/utileria/trampas.png";
					}

				}
			}

			/*=============================================
			RESET BALAS Y ENEMIGOS
			=============================================*/

			datos.imgEnemigos = new Image();
			datos.imgEnemigos.src = "views/img/utileria/enemigos.png";	
			datos.imgBalasEnemigos = new Image();
			datos.imgBalasEnemigos.src = "views/img/utileria/balasEnemigos.png";	

			for(var i = 1; i <= 3; i++){		

				if(datos.nivel == i){

					var xhr_enemigos = new XMLHttpRequest();
					xhr_enemigos.open("GET", "views/js/json/enemigosNivel"+i+".json", true)

				}

			}

			xhr_enemigos.send();

			xhr_enemigos.onreadystatechange = function(){

				if ((xhr_enemigos.readyState == 4)&&(xhr_enemigos.status == 200)){

					datos.posEnemigos = JSON.parse(xhr_enemigos.responseText)
					datos.posBalasEnemigos = JSON.parse(xhr_enemigos.responseText)
					console.log("datos.posBalasEnemigos", datos.posBalasEnemigos);

				}
			}

		}

		/*=============================================
		EJECUTANDO LÍNEA DE TIEMPO
		=============================================*/	

		animacion = frame(juego.tiempo);

		/*=============================================
		FINAL DEL NIVEL
		=============================================*/	

		if(datos.jugador_x >= 950){

			cancelAnimationFrame(animacion);

			var xhr = new XMLHttpRequest();
			var nivel = "ok";
			var puntaje = "200";
			var numeroNivel = datos.nivel;
			var id = datos.id;
			var url = "views/ajax/usuarios.php";
			xhr.open("POST", url, true); 
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("nivel=" + nivel + "& puntaje=" + puntaje + "& numeroNivel=" + numeroNivel + "& id=" + id);

			xhr.onreadystatechange = function(){

				if ((xhr.readyState == 4) && (xhr.status == 200)){

					console.log("xhr.responseText", xhr.responseText);

					if(xhr.responseText == "ok"){	
						
							window.location = "inicio";
					}
				}
			}
			
		}

	}

}