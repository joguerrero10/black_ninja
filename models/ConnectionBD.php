<?php

class ConnectionBD
{
  public static function cBD()
  {
    //usar $_ENV o getenv o $_SERVER
    $servername = getenv('DB_HOST');
    $username = getenv('DB_USERNAME');
    $password = getenv('DB_PASSWORD');
    $port = getenv('DB_PORT');
    $databasename = getenv('DB_DATABASE_NAME');

    $username = "root";
    $password = "";
    $databasename = "black_ninja";
    $port = 4306;

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$databasename;port=$port", $username, $password);
      return $conn;
    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }
}
