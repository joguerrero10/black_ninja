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

    datos.plane2 = new Image();
    datos.plane2.src = "views/img/level" + level + "/plano2.png";
    datos.plane2.onload = () => {
      ctx.drawImage(
        datos.plane2,
        0,
        0,
        datos.plane2.naturalWidth,
        datos.plane2.naturalHeight
      );
      ctx.drawImage(
        datos.plane2,
        1000,
        0,
        datos.plane2.naturalWidth,
        datos.plane2.naturalHeight
      );
      ctx.drawImage(
        datos.plane2,
        2000,
        0,
        datos.plane2.naturalWidth,
        datos.plane2.naturalHeight
      );
    };

    /*=============================================
		PLANO 1
		=============================================*/

    datos.plane1 = new Image();
    datos.plane1.src = "views/img/level" + level + "/plano1.png";
    datos.plane1.onload = () => {
      ctx.drawImage(
        datos.plane1,
        0,
        0,
        datos.plane1.naturalWidth,
        datos.plane1.naturalHeight
      );
      ctx.drawImage(
        datos.plane1,
        1000,
        0,
        datos.plane1.naturalWidth,
        datos.plane1.naturalHeight
      );
      ctx.drawImage(
        datos.plane1,
        2000,
        0,
        datos.plane1.naturalWidth,
        datos.plane1.naturalHeight
      );
    };
  },
};
