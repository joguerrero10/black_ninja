<?php
require_once "ConnectionBD.php";
class managerUsersModels
{

  static public function SelectUsersModels($dataModels)
  {
    $pdo = ConnectionBD::cBD();
    $stmt = $pdo->prepare("SELECT id, first_name, photo  FROM users WHERE identitify = :identitify ");
    $stmt->bindParam(':identitify', $dataModels["identitify"], PDO::PARAM_INT);

    $stmt->execute();
    return $stmt->fetch();

    $pdo = null;
  }

  static public function saveUsersModels($dataModels)
  {
    try {

      $pdo = ConnectionBD::cBD();
      $stmt = $pdo->prepare("INSERT INTO users (identitify, first_name, photo) VALUES (:identitify, :first_name, :photo)");
      $stmt->bindParam(':identitify', $dataModels["identitify"], PDO::PARAM_INT);
      $stmt->bindParam(':first_name', $dataModels["first_name"], PDO::PARAM_STR);
      $stmt->bindParam(':photo', $dataModels["photo"], PDO::PARAM_STR);

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
}
