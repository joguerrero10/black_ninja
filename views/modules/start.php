<?php
session_start();

if (!$_SESSION['validate']) {
  header('location:login');
  exit();
}
?>
<!--=====================================
INICIO
======================================-->
<div id="start"
  class="start">
  <div class="close_session">
    <a href="exit">Cerrar Sesión</a>
  </div>

  <h2 class="greeting">¡Hola <?php echo $_SESSION["first_name"];
                              echo '<img alt="profile" class="profile_user_img" src="' . $_SESSION["photo"] . '">'
                              ?> bienvenid@!</h2>

  <!--=====================================
	NIVEL 1
	======================================-->

  <div id="level1"
    class="levels">
    <div class="point"><?php echo $_SESSION['points_level1']; ?> pts</div>

    <img src="views/img/intro/checkLevel1.svg"
      alt="level1-check">

    <div class="btn-center">
      <button class="btn-start"
        onclick="login.selectLevel(this)"
        level="1">Ingresar
      </button>
    </div>

    <div class="points">
      <h2>MEJORES PUNTAJES</h2>

      <ul>
        <?php
        $points_level_1 = new managerUsersController();
        $points_level_1->pointsLevelController('points_level1');
        ?>
      </ul>
    </div>
  </div>

  <!--=====================================
	NIVEL 2
	======================================-->
  <div id="level2"
    class="levels">
    <div class="point"> <?php echo $_SESSION['points_level2']; ?> pts</div>

    <?php
    if ($_SESSION['level2'] == 'ok') {
      echo '<img src="views/img/intro/checkLevel2.svg"
      alt="level2-check">
          <div class="btn-center">
      <button class="btn-start"  onclick="login.selectLevel(this)"
        level="2">Ingresar</button>
    </div>
      ';
    } else {
      echo '<img class="pb-2" src="views/img/intro/blockLevel2.svg" alt="blockLevel2-check">';
    }

    ?>

    <div class="points">
      <h2>MEJORES PUNTAJES</h2>

      <ul>
        <?php
        $points_level_1 = new managerUsersController();
        $points_level_1->pointsLevelController('points_level2');
        ?>
      </ul>
    </div>
  </div>

  <!--=====================================
	NIVEL 3
	======================================-->
  <div id="level3"
    class="levels">
    <div class="point"><?php echo $_SESSION['points_level3']; ?> pts</div>

    <?php
    if ($_SESSION['level3'] == 'ok') {
      echo '<img src="views/img/intro/checkLevel3.svg"
      alt="level3-check">
          <div class="btn-center">
      <button class="btn-start"  onclick="login.selectLevel(this)"
        level="3">Ingresar</button>
    </div>
      ';
    } else {
      echo '<img class="pb-2" src="views/img/intro/blockLevel3.svg" alt="blockLevel3-check">';
    }

    ?>

    <div class="points">
      <h2>MEJORES PUNTAJES</h2>

      <ul>
        <?php
        $points_level_1 = new managerUsersController();
        $points_level_1->pointsLevelController('points_level3');
        ?>
      </ul>
    </div>
  </div>
</div>

<!--=====================================
CANVAS
======================================-->

<canvas id="lienzo"
  width="3000px"
  height="500px"></canvas>

<!--=====================================
PRELOAD
======================================-->

<!-- <div id="load">

  <div id="preload">

    <span>0%</span>
    <br>
    <meter value="0"
      min="0"
      max="100"
      high="90"></meter>

  </div>

</div> -->