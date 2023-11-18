<?php

require_once "conexion.php";

class GestorUsuariosModel
{

	#SELECCIONAR USUARIOS
	#------------------------------------------------------------
	static public function seleccionarUsuariosModel($datosModel)
	{

		$pdo = Conexion::conectar();
		$stmt = $pdo->prepare("SELECT id, primer_nombre, foto, nivel1, puntaje_nivel1, nivel2, puntaje_nivel2, nivel3, puntaje_nivel3 FROM usuarios WHERE identificador = :identificador");

		$stmt->bindParam(":identificador", $datosModel["identificador"], PDO::PARAM_INT);

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
			$stmt = $pdo->prepare("INSERT INTO usuarios(identificador, primer_nombre, foto, nivel1) VALUES (:identificador, :primer_nombre, :foto, :nivel1)");

			$stmt->bindParam(":identificador", $datosModel["identificador"], PDO::PARAM_INT);
			$stmt->bindParam(":primer_nombre", $datosModel["primer_nombre"], PDO::PARAM_STR);
			$stmt->bindParam(":foto", $datosModel["foto"], PDO::PARAM_STR);
			$stmt->bindParam(":nivel1", $datosModel["nivel1"], PDO::PARAM_STR);

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
			$stmt = $pdo->prepare("SELECT primer_nombre, foto, $datos FROM usuarios ORDER BY $datos DESC LIMIT 3");

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

	#GUARDAR PUNTAJES
	#------------------------------------------------------------

	static public function guardarPuntajesModel($datosModel, $tabla)
	{

		$numero_nivel = $datosModel["numero_nivel"];
		$puntaje_nivel = $datosModel["puntaje_nivel"];

		try {
			$pdo = Conexion::conectar();
			$stmt = $pdo->prepare("UPDATE $tabla SET $numero_nivel = :nivel, $puntaje_nivel = :puntaje WHERE id = :id");

			$stmt->bindParam(":nivel", $datosModel["nivel"], PDO::PARAM_STR);
			$stmt->bindParam(":puntaje", $datosModel["puntaje"], PDO::PARAM_STR);
			$stmt->bindParam(":id", $datosModel["id"], PDO::PARAM_INT);

			if ($stmt->execute()) {

				return "ok";
			} else {

				return "error";
			}

			$pdo = null;
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
	}

	#SELECCIONAR PUNTAJE
	#------------------------------------------------------------
	static public function seleccionarPuntajeModel($datosModel, $tabla)
	{
		try {
			$pdo = Conexion::conectar();
			$stmt = $pdo->prepare("SELECT nivel1, puntaje_nivel1, nivel2, puntaje_nivel2, nivel3, puntaje_nivel3 FROM $tabla WHERE id= :id");

			$stmt->bindParam(":id", $datosModel["id"], PDO::PARAM_INT);

			$stmt->execute();

			return $stmt->fetch();

			$pdo = null;
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
	}
}
