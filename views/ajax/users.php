<?php

require_once "../../controllers/users-controllers.php";
require_once "../../models/users-models.php";

class Ajax
{
  public $identitify;
  public $first_name;
  public $photo;

  public function AjaxUserManager()
  {

    $data = array('identitify' => $this->identitify, 'first_name' => $this->first_name, 'photo' => $this->photo);
    $response = managerUsersController::saveUsersControllers($data);
    echo $response;
  }
}

if (isset($_POST['identitify'])) {
  $ajax = new Ajax();
  $ajax->identitify = $_POST['identitify'];
  $ajax->first_name = $_POST['first_name'];
  $ajax->photo = $_POST['photo'];

  $ajax->AjaxUserManager();
}
