// (function () {
//   // Para que se ejecute solo una vez
//   ("use strict");

//   document.addEventListener("DOMContentLoaded", function () {
//     const login = {
//       login: () => {
//         let identitify = "2222";
//         let first_name = "Joel";
//         let photo = "views/img/intro/julio.png";

//         let xhr = new XMLHttpRequest();
//       },
//     };
//     console.log("DOM fully loaded and parsed");
//   }); //DOM CONTENT LOADED
// });

const login = {
  login: () => {
    let identitify = "2222";
    let first_name = "Joel";
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
        console.log("xhr.responseText", xhr.responseText);
      }
    };
  },
};
