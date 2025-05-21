<?php

header('Content-Type: application/json');

$filePath = 'jobs.json';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['title'], $data['company'], $data['desc'], $data['rate'], $data['location'], $data['employmentType'], $data['skills'], $data['postedDate'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$jobs = [];
if (file_exists($filePath)) {
    $jsonContent = file_get_contents($filePath);
    if (!empty($jsonContent)) {
        $jobs = json_decode($jsonContent, true);
    }
}

$lastId = 0;
if (!empty($jobs)) {
    $lastId = intval(end($jobs)['id']);
}
$newJobId = $lastId + 1;

$newJob = [
    'id' => $newJobId,
    'title' => $data['title'],
    'company' => $data['company'],
    'desc' => $data['desc'],
    'rate' => $data['rate'],
    'location' => $data['location'],
    'employmentType' => $data['employmentType'],
    'skills' => $data['skills'],
    'postedDate' => $data['postedDate']
];

$jobs[] = $newJob;

file_put_contents($filePath, json_encode($jobs, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Job successfully added.']);
?>
