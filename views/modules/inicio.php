<?php

session_start();

if (!$_SESSION["validate"]) {

  header("location:ingreso");

  exit();
}

?>

<!--=====================================
INICIO
======================================-->

<div id="inicio">

  <div id="cerrarSesion"><a href="salir">Cerrar Sesión</a></div>

  <h2 id="saludo">¡Hola <?php echo $_SESSION["first_name"];
                        echo '<img style="border-radius:100%; margin-left:10px" width="30px" src="' . $_SESSION["photo"] . '">'
                        ?> bienvenid@!</h2>

  <!--=====================================
	NIVEL 1
	======================================-->
  <div id="nivel1" class="niveles">

    <div class="puntaje"><?php echo $_SESSION["points_level1"]; ?> pts</div>

    <img src="views/img/intro/checkLevel1.svg">

    <center><button onclick="inicio.elegirNivel(this)" nivel="1">INGRESAR</button></center>

    <div class="puntajes">

      <h2>MEJORES PUNTAJES</h2>

      <ul>

        <?php

        $puntajes_nivel1 = new GestorUsuariosController();
        $puntajes_nivel1->puntajesNivelController("points_level1");

        ?>

      </ul>
    </div>

  </div>

  <!--=====================================
	NIVEL 2
	======================================-->
  <div id="nivel2" class="niveles">

    <div class="puntaje"><?php echo $_SESSION["points_level2"]; ?> pts</div>

    <?php

    if ($_SESSION["level2"] == "ok") {

      echo '<img src="views/img/intro/checkLevel2.svg">
				  <center><button onclick="inicio.elegirNivel(this)" nivel="2">INGRESAR</button></center>';
    } else {

      echo '<img src="views/img/intro/blockLevel2.svg">';
    }

    ?>

    <div class="puntajes">

      <h2>MEJORES PUNTAJES</h2>

      <ul>

        <?php

        $puntajes_nivel1 = new GestorUsuariosController();
        $puntajes_nivel1->puntajesNivelController("points_level2");

        ?>

      </ul>

    </div>

  </div>

  <!--=====================================
	NIVEL 3
	======================================-->
  <div id="nivel3" class="niveles">

    <div class="puntaje"><?php echo $_SESSION["points_level3"]; ?> pts</div>

    <?php

    if ($_SESSION["level3"] == "ok") {

      echo '<img src="views/img/intro/checkLevel3.svg">
				  <center><button onclick="inicio.elegirNivel(this)" nivel="3">INGRESAR</button></center>';
    } else {

      echo '<img src="views/img/intro/blockLevel3.svg">';
    }

    ?>

    <div class="puntajes">

      <h2>MEJORES PUNTAJES</h2>

      <ul>

        <?php

        $puntajes_nivel1 = new GestorUsuariosController();
        $puntajes_nivel1->puntajesNivelController("points_level3");

        ?>

      </ul>

    </div>

  </div>

</div>

<!--=====================================
CANVAS
======================================-->

<canvas id="lienzo" width="3000px" height="500px"></canvas>

<!--=====================================
PRELOAD
======================================-->

<div id="carga">

  <div id="preload">

    <span>0%</span>
    <br>
    <meter value="0" min="0" max="100" high="90"></meter>

  </div>

</div>