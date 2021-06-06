<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");


include_once 'config/core.php';
include_once 'lib/php-jwt/src/BeforeValidException.php';
include_once 'lib/php-jwt/src/ExpiredException.php';
include_once 'lib/php-jwt/src/SignatureInvalidException.php';
include_once 'lib/php-jwt/src/JWT.php';

use \Firebase\JWT\JWT;

include_once 'config/database.php';
include_once 'objects/user.php';
include_once "config/core.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$data = json_decode(file_get_contents("php://input"));

$jwt = isset($data->jwt) ? $data->jwt : "";

if ($jwt) {
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        $user->username = $data->username;
        $user->password = $data->password;
        $user->id = $decoded->data->id;

        if($user->update()){
            $token = array(
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "iss" => $issuer,
                "data" => array(
                    "id" => $user->id,
                    "username" => $user->username,
                )
            );
            $jwt = JWT::encode($token, $key);
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Пользователь был обновлён",
                    "jwt" => $jwt
                )
            );
        }
        else {
            http_response_code(401);
            echo json_encode(array("message" => "Невозможно обновить пользователя."));
        }
    } catch (Exception $e){
        http_response_code(401);

        echo json_encode(array(
            "message" => "Доступ закрыт.",
            "error" => $e->getMessage()
        ));
    }
}
else {
    http_response_code(401);

    echo json_encode(array("message" => "Доступ закрыт."));
}

