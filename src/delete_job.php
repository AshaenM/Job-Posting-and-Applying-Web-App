<?php
header('Content-Type: application/json');

$filename = 'data/jobs.json';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Job ID is required']);
    exit;
}

$id = $_GET['id'];

if (!file_exists($filename)) {
    http_response_code(500);
    echo json_encode(['message' => 'Jobs file not found']);
    exit;
}

$jobsData = file_get_contents($filename);
$jobs = json_decode($jobsData, true);

if ($jobs === null) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to parse jobs data']);
    exit;
}

$filteredJobs = array_filter($jobs, function ($job) use ($id) {
    return $job['id'] != $id;
});

if (count($filteredJobs) === count($jobs)) {
    http_response_code(404);
    echo json_encode(['message' => 'Job not found']);
    exit;
}

if (file_put_contents($filename, json_encode(array_values($filteredJobs), JSON_PRETTY_PRINT))) {
    echo json_encode(['message' => 'Job deleted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to write to file']);
}
?>
