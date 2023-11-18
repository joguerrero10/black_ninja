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

	},

	soltar: function(tecla){

		/*=============================================
		SOLTAR TECLADO
		=============================================*/
		tecla.preventDefault();
		if(tecla.keyCode == 37){datos.izquierda = false; datos.imgJugador.src = "views/img/jugador/stop_left.png";}
		if(tecla.keyCode == 39){datos.derecha = false; 	datos.imgJugador.src = "views/img/jugador/stop_right.png";}
		if(tecla.keyCode == 38){datos.salto = false;}

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
		MOVIMIENTO IZQUIERDA
		=============================================*/	

		if(datos.izquierda){

			

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

			//RESET DE LA PLATAFORMA

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