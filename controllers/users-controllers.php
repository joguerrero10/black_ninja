<?php
class managerUsersController
{
  #GUARDAR USUARIO
  #------------------------------------------------------------
  static  public  function saveUsersControllers($data)
  {
    $responseInsert = "";
    $dataController = array('identitify' => $data['identitify'], 'first_name' => $data['first_name'], 'photo' => $data['photo']);
    $responseSelect = managerUsersModels::SelectUsersModels($dataController);
    if (!$responseSelect) {
      $responseInsert  = managerUsersModels::saveUsersModels($dataController);
    }

    if ($responseSelect || $responseInsert == "ok") {
      echo 'ok';
    }
  }
}
