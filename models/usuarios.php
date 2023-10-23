<?php

require_once "conexion.php";

class GestorUsuariosModel
{

  #SELECCIONAR USUARIOS
  #------------------------------------------------------------
  static public function seleccionarUsuariosModel($datosModel)
  {

    $pdo = Conexion::conectar();
    $stmt = $pdo->prepare("SELECT id, first_name, photo, level1, points_level1, level2, points_level2, level3, points_level3  FROM users WHERE identitify = :identitify");

    $stmt->bindParam(':identitify', $datosModel["identitify"], PDO::PARAM_INT);

    $stmt->execute();
    return $stmt->fetch();

    $pdo = null;
  }

  #GUARDAR USUARIOS
  #------------------------------------------------------------
  static public function guardarUsuariosModel($datosModel)
  {

    try {
      $pdo = Conexion::conectar();
      $stmt = $pdo->prepare(
        "INSERT INTO users (identitify, first_name, photo, level1) VALUES (:identitify, :first_name, :photo, :level1)"
      );

      $stmt->bindParam(':identitify', $datosModel["identitify"], PDO::PARAM_INT);
      $stmt->bindParam(':first_name', $datosModel["first_name"], PDO::PARAM_STR);
      $stmt->bindParam(':photo', $datosModel["photo"], PDO::PARAM_STR);
      $stmt->bindParam(':level1', $datosModel["level1"], PDO::PARAM_STR);

      if ($stmt->execute()) {
        echo "Registro insertado correctamente.";
      } else {
        echo "Error al insertar el registro.";
      }
      $pdo = null;
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  #SELECCIONAR PUNTAJES
  #------------------------------------------------------------
  static public function puntajesNivelModel($datos)
  {
    try {
      $pdo = Conexion::conectar();
      $stmt = $pdo->prepare("SELECT first_name, photo, $datos FROM users ORDER BY $datos DESC LIMIT 3");

      if ($stmt->execute()) {
        return $stmt->fetchAll();
      } else {
        echo "Error al encontrar el registro.";
      }

      $pdo = null;
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }
}
