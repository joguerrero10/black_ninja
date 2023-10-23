<?php

class GestorUsuariosController
{

  #GUARDAR USUARIO
  #------------------------------------------------------------
  static public function guardarUsuariosController($datos)
  {

    $respuestaInsertar = "";

    $datosController = array(
      "identitify" => $datos["identitify"],
      "first_name" => $datos["first_name"],
      "photo" => $datos["photo"],
      "level1" => "ok"
    );

    $respuestaSeleccionar = GestorUsuariosModel::seleccionarUsuariosModel($datosController);

    if (!$respuestaSeleccionar) {

      $respuestaInsertar = GestorUsuariosModel::guardarUsuariosModel($datosController);
    }

    if ($respuestaSeleccionar || $respuestaInsertar == "ok") {

      $respuestaSeleccionar = GestorUsuariosModel::seleccionarUsuariosModel($datosController);

      session_start();

      $_SESSION['validate'] = true;
      $_SESSION["first_name"] = $respuestaSeleccionar["first_name"];
      $_SESSION["photo"] = $respuestaSeleccionar["photo"];
      $_SESSION["level1"] = $respuestaSeleccionar["level1"];
      $_SESSION["level2"] = $respuestaSeleccionar["level2"];
      $_SESSION["level3"] = $respuestaSeleccionar["level3"];
      $_SESSION["points_level1"] = $respuestaSeleccionar["points_level1"];
      $_SESSION["points_level2"] = $respuestaSeleccionar["points_level2"];
      $_SESSION["points_level3"] = $respuestaSeleccionar["points_level3"];

      echo "ok";
    }
  }

  #MEJORES PUNTAJES NIVEL
  #------------------------------------------------------------
  static public function puntajesNivelController($datos)
  {

    $respuesta = GestorUsuariosModel::puntajesNivelModel($datos);

    foreach ($respuesta as $row => $item) {

      if ($item[$datos] > 0) {

        echo '<li>
						<img src="' . $item["photo"] . '">
						<h3>' . $item["first_name"] . '</h3>
						<h2>' . $item[$datos] . '</h2>
					</li>';
      }
    }
  }
}
