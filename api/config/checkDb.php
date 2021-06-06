<?php

require_once 'Database.php';

$database = new Database();
$conn = $database->getConnection();

if (!$conn) {
    echo "Fall...";
} else {
    echo "Ok";
}
