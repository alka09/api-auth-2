<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");

include_once 'config/Database.php';
include_once 'objects/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->username = $data->username;
$user->password = $data->password;

if(!empty($user->username) && !empty($user->password)){

    $user->create();
    http_response_code(200);

    echo json_encode(array("message" => "User was created."));
}

else{

    http_response_code(400);

    echo json_encode(array("message" => "Unable to create user."));
}