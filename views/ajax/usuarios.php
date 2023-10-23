<?php

require_once "../../controllers/usuarios.php";
require_once "../../models/usuarios.php";

class Ajax
{

  public $identitify;
  public $first_name;
  public $photo;

  public function gestorUsuariosAjax()
  {

    $datos = array(
      "identitify" => $this->identitify,
      "first_name" => $this->first_name,
      "photo" => $this->photo
    );

    $respuesta = GestorUsuariosController::guardarUsuariosController($datos);

    echo $respuesta;
  }
}

if (isset($_POST["identitify"])) {

  $a = new Ajax();
  $a->identitify = $_POST["identitify"];
  $a->first_name = $_POST["first_name"];
  $a->photo = $_POST["photo"];
  $a->gestorUsuariosAjax();
}