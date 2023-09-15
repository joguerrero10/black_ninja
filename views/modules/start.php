<?php
session_start();

if (!$_SESSION['validate']) {
  header('location:index.php?validate=login');
  exit();
}
?>
<!--=====================================
INICIO
======================================-->
<div class="start">
  <div class="close_session">
    <a href="">Cerrar Sesión</a>
  </div>

  <h2 class="greeting">¡Hola <?php echo $_SESSION["first_name"];
                              echo '<img alt="profile" class="profile_user_img" src="' . $_SESSION["photo"] . '">'
                              ?> bienvenid@!</h2>

  <!--=====================================
	NIVEL 1
	======================================-->

  <div id="level1" class="levels">
    <div class="point">100 pts</div>

    <img src="views/img/intro/checkLevel1.svg" alt="level1-check">

    <div class="btn-center">
      <button class="btn-start">Ingresar</button>
    </div>

    <div class="points">

    </div>
  </div>

  <!--=====================================
	NIVEL 2
	======================================-->
  <div id="level2" class="levels">
    <div class="point">0 pts</div>

    <img src="views/img/intro/blockLevel2.svg" alt="blockLevel2-check">

    <div class="points">

    </div>
  </div>

  <!--=====================================
	NIVEL 3
	======================================-->
  <div id="level3" class="levels">
    <div class="point">0 pts</div>

    <img src="views/img/intro/blockLevel3.svg" alt="blockLevel3-check">

    <div class="points">

    </div>
  </div>
</div>