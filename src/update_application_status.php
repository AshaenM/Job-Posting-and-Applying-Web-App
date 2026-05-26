<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$applicationsFile = 'data/applications.json';

if (!isset($_GET['id']) || !isset($_GET['status'])) {
    echo json_encode(['message' => 'Missing parameters']);
    exit;
}

$applicationId = $_GET['id'];
$newStatus = $_GET['status'];

if (!file_exists($applicationsFile)) {
    echo json_encode(['message' => 'Applications file not found']);
    exit;
}

$applications = json_decode(file_get_contents($applicationsFile), true);
$updated = false;

foreach ($applications as &$app) {
    if ($app['applicationId'] == $applicationId) {
        $app['status'] = $newStatus;
        $updated = true;
        break;
    }
}

if ($updated) {
    file_put_contents($applicationsFile, json_encode($applications, JSON_PRETTY_PRINT));
    echo json_encode(['message' => 'Application status updated']);
} else {
    echo json_encode(['message' => 'Application not found']);
}
?>
