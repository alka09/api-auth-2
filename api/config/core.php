<?php

error_reporting(E_ALL);

date_default_timezone_set("Europe/Moscow");

$key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
$issued_at = time();
$expiration_time = $issued_at + (60 * 60);
$issuer = "http://localhost/rest-api-authentication/";