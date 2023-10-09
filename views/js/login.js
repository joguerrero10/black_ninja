const login = {
  login: () => {
    let identitify = "111111";
    let first_name = "Thiago";
    let photo = "views/img/intro/pedro.png";

    let xhr = new XMLHttpRequest();
    let url = "views/ajax/users.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "identitify=" +
        identitify +
        "& first_name=" +
        first_name +
        "& photo=" +
        photo
    );
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText === "ok") {
          window.location = "start";
        }
      }
    };
  },

  selectLevel: ($event) => {
    data.level = $event.getAttribute("level");
    login.startLevels(data.level);
  },

  startLevels: (level) => {
    document
      .querySelector("#start")
      .parentNode.removeChild(document.querySelector("#start"));

    canvas = document.querySelector("#lienzo");
    ctx = canvas.getContext("2d");

    document.querySelector("#lienzo").style.display = "block";

    /*=============================================
		PLANO 3
		=============================================*/

    /*=============================================
		PLANO 3
		=============================================*/

    data.plane3 = new Image();
    data.plane3.src = "views/img/level" + level + "/plano3.png";
    data.plane3.onload = function () {
      ctx.drawImage(
        data.plane3,
        0,
        0,
        data.plane3.naturalWidth,
        data.plane3.naturalHeight
      );
      ctx.drawImage(
        data.plane3,
        1000,
        0,
        data.plane3.naturalWidth,
        data.plane3.naturalHeight
      );
      ctx.drawImage(
        data.plane3,
        2000,
        0,
        data.plane3.naturalWidth,
        data.plane3.naturalHeight
      );
    };

    /*=============================================
		PLANO 2
		=============================================*/

    data.plane2 = new Image();
    data.plane2.src = "views/img/level" + level + "/plano2.png";
    data.plane2.onload = function () {
      ctx.drawImage(
        data.plane2,
        0,
        0,
        data.plane2.naturalWidth,
        data.plane2.naturalHeight
      );
      ctx.drawImage(
        data.plane2,
        1000,
        0,
        data.plane2.naturalWidth,
        data.plane2.naturalHeight
      );
      ctx.drawImage(
        data.plane2,
        2000,
        0,
        data.plane2.naturalWidth,
        data.plane2.naturalHeight
      );
    };

    /*=============================================
		PLANO 1
		=============================================*/

    data.plane1 = new Image();
    data.plane1.src = "views/img/level" + level + "/plano1.png";
    data.plane1.onload = function () {
      ctx.drawImage(
        data.plane1,
        0,
        0,
        data.plane1.naturalWidth,
        data.plane1.naturalHeight
      );
      ctx.drawImage(
        data.plane1,
        1000,
        0,
        data.plane1.naturalWidth,
        data.plane1.naturalHeight
      );
      ctx.drawImage(
        data.plane1,
        2000,
        0,
        data.plane1.naturalWidth,
        data.plane1.naturalHeight
      );
    };

    /*=============================================
		DETALLES
		=============================================*/

    data.details = new Image();
    data.details.src = "views/img/level" + level + "/detalles.png";
    let xhr_details;
    if (level === 1) {
      let xhr_details = new XMLHttpRequest();
      xhr_details.open("GET", "views/js/json/blocksDetailsLevel1.json", true);
    }

    if (level === 2) {
      let xhr_details = new XMLHttpRequest();
      xhr_details.open("GET", "views/js/json/blocksDetailsLevel2.json", true);
    }

    if (level === 3) {
      let xhr_details = new XMLHttpRequest();
      xhr_details.open("GET", "views/js/json/blocksDetailsLevel3.json", true);
    }

    xhr_details.send();

    xhr_details.onreadystatechange = function () {
      if (xhr_details.readyState == 4 && xhr_details.status == 200) {
        data.blocksDetails = JSON.parse(xhr_details.responseText);
      }
    };

    data.details.onload = function () {
      for (let i = 0; i < data.blocksDetails.length; i++) {
        ctx.drawImage(
          data.details,
          data.blocksDetails[i].x,
          data.blocksDetails[i].y,
          data.blocksDetails[i].width,
          data.blocksDetails[i].height
        );
      }
    };

    /*=============================================
		BLOQUES
		=============================================*/

    data.texturePlatform = new Image();
    data.texturePlatform.src =
      "views/img/level" + level + "/texturaPlataforma.jpg";

    if (level === 1) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "views/js/json/blocksLevel1.json", true);
    }

    if (level === 2) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "views/js/json/blocksLevel2.json", true);
    }

    if (level === 3) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "views/js/json/blocksLevel3.json", true);
    }

    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // El método JSON.parse() analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis.

        data.blocks = JSON.parse(xhr.responseText);
      }
    };

    data.texturePlatform.onload = function () {
      for (let i = 0; i < data.blocks.length; i++) {
        ctx.drawImage(
          data.texturePlatform,
          data.blocks[i].x,
          data.blocks[i].y,
          data.blocks[i].width,
          data.blocks[i].height
        );
      }
    };

    /*=============================================
		JUGADOR
		=============================================*/

    data.imgPlayer = new Image();
    data.imgPlayer.src = "views/img/player/stop_right.png";
    data.imgPlayer.onload = function () {
      ctx.drawImage(
        data.imgPlayer,
        0,
        0,
        100,
        100,
        data.player_x,
        data.player_y,
        data.player_width,
        data.player_high
      );
    };
    /*=============================================
		PLANO 0
		=============================================*/

    data.plane0 = new Image();
    data.plane0.src = "views/img/level" + level + "/plano0.png";
    data.plane0.onload = function () {
      ctx.drawImage(
        data.plane0,
        0,
        0,
        data.plane0.naturalWidth,
        data.plane0.naturalHeight
      );
      ctx.drawImage(
        data.plane0,
        1000,
        0,
        data.plane0.naturalWidth,
        data.plane0.naturalHeight
      );
      ctx.drawImage(
        data.plane0,
        2000,
        0,
        data.plane0.naturalWidth,
        data.plane0.naturalHeight
      );
    };

    /*=============================================
		PRELOAD
		=============================================*/

    let uploadFiles = [
      data.plane0,
      data.texturePlatform,
      data.details,
      data.plane1,
      data.plane2,
      data.plane3,
    ];
    let numberFiles = 0;
    let percentage = 0;

    for (let i = 0; i < uploadFiles.length; i++) {
      uploadFiles[i].addEventListener("load", precarga);
    }

    function precarga(e) {
      numberFiles++;
      percentage = 100 / uploadFiles.length;

      document.querySelector("#load span").innerHTML =
        Math.ceil(percentage * numberFiles) + "%";
      document.querySelector("#load meter").value = Math.ceil(
        percentage * numberFiles
      );

      if (numberFiles == uploadFiles.length) {
        document.querySelector("#lienzo").style.display = "block";

        document.querySelector("#load").style.opacity = 0;

        setTimeout(function () {
          document.querySelector("#load").style.display = "none";
        }, 10);
      }
    }
  },
};
