<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");

class Database
{
    private $host = "localhost";
    private $db_name = "testdb";
    private $username = "root";
    private $password = "root";
    public $conn;

    public function getConnection(): ?PDO
    {

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

}

//$connect = mysqli_connect('localhost', 'root', 'root', 'testdb');

