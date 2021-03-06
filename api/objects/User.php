<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");
// 'user' object

class User{

    private $conn;
    private $table_name = "users";

    public $id;
    public $username;
    public $password;

    public function __construct($db){
        $this->conn = $db;
    }

    function createUser($connect): bool
    {


        $query = "INSERT INTO " . $this->table_name . "
            SET                
                username = :username,
                password = :password";

        $prop = $this->conn->prepare($query);

        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $prop->bindParam(':username', $this->username);
//        $prop->bindParam(':password', $this->password);


        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $prop->bindParam(':password', $password_hash);

        if($prop->execute()){
            return true;
        }

        http_response_code(201);

        $res = [
            "status" => true,
            "user_id" => mysqli_insert_id($connect)
        ];

        echo json_encode($res);
        return false;
    }

    function usernameExists(){

        $query = "SELECT id, password
            FROM " . $this->table_name . "
            WHERE username = ?
            LIMIT 0,1";

        $stmt = $this->conn->prepare( $query );

        $this->username=htmlspecialchars(strip_tags($this->username));

        $stmt->bindParam(1, $this->username);
        $stmt->execute();

        $count = $stmt->rowCount();

        if($count>0){

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->password = $row['password'];

            return true;
        }

        return false;
    }

    public function update()
    {
        $password_set = !empty($this->password) ? ", password = :password" : "";

        $query = "UPDATE " . $this->table_name . "
            SET
                username = :username,
                {$password_set}
            WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->username = htmlspecialchars(strip_tags($this->username));

        $stmt->bindParam(':username', $this->username);

        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }

        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;

    }
}