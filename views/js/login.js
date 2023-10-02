const login = {
  login: () => {
    let identitify = "0101010101";
    let first_name = "Pedro";
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
};
