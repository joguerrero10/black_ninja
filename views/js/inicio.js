/*=============================================
METODOS DEL OBJETO INICIO
=============================================*/

let inicio = {
  /*=============================================
	METODO INGRESO A LA APLICACIÓN
	=============================================*/

  iniciar: function () {
    let identitify = "101010101";
    let first_name = "Pedro";
    let photo = "views/img/intro/pedro.png";

    //AJAX: Asynchronous JavaScript And XML

    let url = "views/ajax/usuarios.php";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "identitify=" +
        identitify +
        "& first_name=" +
        first_name +
        "& photo=" +
        photo
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText == "ok") {
          window.location = "inicio";
        }
      }
    };
  },

  /*=============================================
	ELEGIR NIVEL
	=============================================*/

  elegirNivel: function (event) {
    datos.nivel = event.getAttribute("nivel");
    inicio.inicioNiveles(datos.nivel);
  },

  /*=============================================
	INICIO DE NIVELES
	=============================================*/

  inicioNiveles: function (nivel) {
    document
      .querySelector("#inicio")
      .parentNode.removeChild(document.querySelector("#inicio"));

    canvas = document.querySelector("#lienzo");
    ctx = canvas.getContext("2d");
    document.querySelector("#carga").style.display = "block";

    /*=============================================
		PLANO 3
		=============================================*/

    datos.plano3 = new Image();
    datos.plano3.src = "views/img/nivel" + nivel + "/plano3.png";

    /*=============================================
		PLANO 2
		=============================================*/

    datos.plano2 = new Image();
    datos.plano2.src = "views/img/nivel" + nivel + "/plano2.png";

    /*=============================================
		PLANO 1
		=============================================*/

    datos.plano1 = new Image();
    datos.plano1.src = "views/img/nivel" + nivel + "/plano1.png";

    /*=============================================
		DETALLES
		=============================================*/

    datos.detalles = new Image();
    datos.detalles.src = "views/img/nivel" + nivel + "/detalles.png";
    let xhr_detalles = new XMLHttpRequest();

    if (nivel == 1) {
      let xhr_detalles = new XMLHttpRequest();
      xhr_detalles.open(
        "GET",
        "views/js/json/bloquesDetallesNivel1.json",
        true
      );
      xhr_detalles.send();
    } else if (nivel == 2) {
      let xhr_detalles = new XMLHttpRequest();
      xhr_detalles.open(
        "GET",
        "views/js/json/bloquesDetallesNivel2.json",
        true
      );
      xhr_detalles.send();
    } else if (nivel == 3) {
      let xhr_detalles = new XMLHttpRequest();
      xhr_detalles.open(
        "GET",
        "views/js/json/bloquesDetallesNivel3.json",
        true
      );
      xhr_detalles.send();
    }

    xhr_detalles.onreadystatechange = function () {
      if (xhr_detalles.readyState == 4 && xhr_detalles.status == 200) {
        datos.bloquesDetalles = JSON.parse(xhr_detalles.responseText);
      }
    };

    /*=============================================
		BLOQUES
		=============================================*/

    datos.texturaPlataforma = new Image();
    datos.texturaPlataforma.src =
      "views/img/nivel" + nivel + "/texturaPlataforma.jpg";
    let xhr = new XMLHttpRequest();

    if (nivel == 1) {
      xhr.open("GET", "views/js/json/bloquesNivel1.json", true);
    }

    if (nivel == 2) {
      xhr.open("GET", "views/js/json/bloquesNivel2.json", true);
    }

    if (nivel == 3) {
      xhr.open("GET", "views/js/json/bloquesNivel3.json", true);
    }

    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // El método JSON.parse() analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis.

        datos.bloques = JSON.parse(xhr.responseText);
      }
    };


    /*=============================================
		JUGADOR
		=============================================*/

    datos.imgJugador = new Image();
    datos.imgJugador.src = "views/img/jugador/stop_right.png";

    /*=============================================
		PLANO 0
		=============================================*/

    datos.plano0 = new Image();
    datos.plano0.src = "views/img/nivel" + nivel + "/plano0.png";

    /*=============================================
		PRELOAD
		=============================================*/

    let cargarArchivos = [
      datos.plano0,
      datos.texturaPlataforma,
      datos.detalles,
      datos.plano1,
      datos.plano2,
      datos.plano3,
    ];
    let numeroArchivos = 0;
    let porcentaje = 0;

    for (let i = 0; i < cargarArchivos.length; i++) {
      cargarArchivos[i].addEventListener("load", precarga);
    }

    function precarga(e) {
      numeroArchivos++;
      porcentaje = 100 / cargarArchivos.length;

      document.querySelector("#carga span").innerHTML =
        Math.ceil(porcentaje * numeroArchivos) + "%";
      document.querySelector("#carga meter").value = Math.ceil(
        porcentaje * numeroArchivos
      );
      if (numeroArchivos == cargarArchivos.length) {
        document.querySelector("#lienzo").style.display = "block";

        document.querySelector("#carga").style.opacity = 0;

        setTimeout(function () {
          document.querySelector("#carga").style.display = "none";
        }, 10000);

        juego.teclado();
        juego.tiempo();
      }
    }
  },
};
