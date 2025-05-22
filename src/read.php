<?php
header("Content-Type: application/json");

$file = isset($_GET['file']) ? $_GET['file'] : '';
$path = __DIR__ . "/data/" . $file . ".json";

if (!file_exists($path)) {
    http_response_code(404);
    echo json_encode(["error" => "File not found"]);
    exit;
}

echo file_get_contents($path);
