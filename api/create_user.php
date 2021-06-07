<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");

include_once 'config/Database.php';
include_once "objects/students.php";
include_once "objects/User.php";

$database = new Database();
$db = $database->getConnection();


$students = new Students($db);
$user = new User($db);
$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"));
$user->username = $data->username;
$user->password = $data->password;

$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
$id = $params[1];
//$username = $params[2];
//$password = $params[3];


if ($method === 'GET') {
    if (isset($id)) {
        $students->getStudent($db, $id);
    } else {
        $students->getStudents($db);
    }
} elseif ($method === 'POST') {
    if ($user->createUser($db)) {
        $data = json_decode(file_get_contents("php://input"));
        echo json_encode(array("message" => "User was created."));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create user."));
    }
}
