<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <title>BLACK NINJA | JUEGO DE PLATAFORMA</title>

  <link rel="icon"
    href="views/img/intro/favicon.png">
  <link href="views/css/estilo.css"
    type="text/css"
    rel="stylesheet"
    media="">
  <link href="https://fonts.googleapis.com/css?family=Patrick+Hand"
    rel="stylesheet">
  <!-- font-family: 'Patrick Hand', cursive; -->

</head>

<body>

  <!--=====================================
	PANTALLA VERTICAL
	======================================-->

  <div id="vertical"></div>

  <!--=====================================
	MARCO
	======================================-->

  <div id="marco"></div>

  <!--=====================================
	CONTENEDOR
	======================================-->

  <div id="contenedor">

    <?php

    if (isset($_GET["validate"])) {

      switch ($_GET["validate"]) {
        case "inicio":
          include "modules/inicio.php";
          break;
        case "salir":
          include "modules/salir.php";
          break;
        default:
          include "modules/ingreso.php";
      }
    } else {

      include "modules/ingreso.php";
    }

    ?>

  </div>

  <!--=====================================
	CREDITOS
	======================================-->

  <footer>

    <center>
      <p>Juego desarrollado por Inovix <span>©copyright</span></p>
    </center>

  </footer>

  <script src="views/js/variables_y_propiedades.js"></script>
  <script src="views/js/inicio.js"></script>
</body>

</html>