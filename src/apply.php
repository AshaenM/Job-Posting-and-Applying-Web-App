<?php

$filePath = 'applications.json';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name'], $data['email'], $data['resume'], $data['jobId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$applications = [];
if (file_exists($filePath)) {
    $jsonContent = file_get_contents($filePath);
    if (!empty($jsonContent)) {
        $applications = json_decode($jsonContent, true);
    }
}

$lastId = 0;
if (!empty($applications)) {
    $lastId = intval(end($applications)['applicationId']);
}
$newApplicationId = $lastId + 1;

$newApplication = [
    'applicationId' => $newApplicationId,
    'jobId' => $data['jobId'],
    'name' => $data['name'],
    'email' => $data['email'],
    'resume' => $data['resume'],
    'status' => 'Pending Review'
];

$applications[] = $newApplication;
file_put_contents($filePath, json_encode($applications, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Application submitted successfully.']);
?>
