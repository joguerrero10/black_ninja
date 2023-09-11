<?php
class managerUsersController
{
  static  public  function saveUsersControllers($data)
  {
    $dataController = array('identitify' => $data['identitify'], 'first_name' => $data['first_name'], 'photo' => $data['photo']);
    $response = managerUsersModels::saveUsersModels($dataController);
  }
}
