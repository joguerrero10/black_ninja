<?php
class ConnectionBD
{
  public static function cBD()
  {
    //usar $_ENV o getenv o $_SERVER
    //$servername = $_ENV["DB_HOST"];
    // $username = $_ENV["DB_USERNAME"];
    // $password = $_ENV["DB_PASSWORD"];
    // $databasename = "black_ninja";
    // $port = 4306;

    $servername = "localhost";
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
