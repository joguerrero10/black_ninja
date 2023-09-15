const login = {
  login: () => {
    let identitify = "111111";
    let first_name = "Thiago";
    let photo = "views/img/intro/julio.png";

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
};
