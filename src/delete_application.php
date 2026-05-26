<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
$applicationId = isset($_GET['id']) ? $_GET['id'] : null;

if (!$applicationId) {
    http_response_code(400);
    echo json_encode(["error" => "No application ID provided"]);
    exit;
}

$file = 'data/applications.json';

$applications = json_decode(file_get_contents($file), true);
$applications = array_filter($applications, function ($app) use ($applicationId) {
    return $app['applicationId'] != $applicationId;
});

// Reindex array
$applications = array_values($applications);

if (file_put_contents($file, json_encode($applications, JSON_PRETTY_PRINT))) {
    echo json_encode(["message" => "Application deleted"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to write file"]);
}
?>
