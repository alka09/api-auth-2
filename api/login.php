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
$username_exists = $user->usernameExists();

include_once 'config/core.php';
include_once 'lib/php-jwt/src/BeforeValidException.php';
include_once 'lib/php-jwt/src/ExpiredException.php';
include_once 'lib/php-jwt/src/SignatureInvalidException.php';
include_once 'lib/php-jwt/src/JWT.php';

use \Firebase\JWT\JWT;

error_reporting(E_ALL);

date_default_timezone_set("Europe/Moscow");

//$key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
//$issued_at = time();
//$expiration_time = $issued_at + (60 * 60);
//$issuer = "http://localhost/rest-api-authentication/";

if ($username_exists && password_verify($data->password, $user->password)) {

    $token = array(
        "iat" => $issued_at,
        "exp" => $expiration_time,
        "iss" => $issuer,
        "data" => array(
            "id" => $user->id,
            "username" => $user->username,
        )
    );

    http_response_code(200);

    $jwt = JWT::encode($token,$key);
    echo json_encode(
        array(
            "message" => "Успешный вход в систему",
            "jwt" => $jwt
        )
    );
} else {
    http_response_code(401);

    echo json_encode(array("message" => "Ошибка входа"));
}

