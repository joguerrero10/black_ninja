<?php
require 'vendor/autoload.php';
require_once "./controllers/template.php";
require_once "./controllers/users-controllers.php";
require_once "./models/users-models.php";

$envPath = './';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$template = new TemplateController();
$template->template();