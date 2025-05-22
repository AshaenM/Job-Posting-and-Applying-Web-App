<?php
header('Content-Type: application/json');

$filename = 'data/jobs.json';
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request. Job ID is required.']);
    exit;
}

if (!file_exists($filename)) {
    http_response_code(500);
    echo json_encode(['message' => 'Jobs file not found']);
    exit;
}

$jobs = json_decode(file_get_contents($filename), true);

if ($jobs === null) {
    http_response_code(500);
    echo json_encode(['message' => 'Invalid jobs data']);
    exit;
}

$updated = false;
foreach ($jobs as &$job) {
    if ($job['id'] == $data['id']) {
        $job['title'] = isset($data['title']) ? $data['title'] : $job['title'];
        $job['location'] = isset($data['location']) ? $data['location'] : $job['location'];
        $job['employmentType'] = isset($data['employmentType']) ? $data['employmentType'] : $job['employmentType'];
        $job['rate'] = isset($data['rate']) ? $data['rate'] : $job['rate'];

        $updated = true;
        break;
    }
}

if (!$updated) {
    http_response_code(404);
    echo json_encode(['message' => 'Job not found']);
    exit;
}

if (file_put_contents($filename, json_encode($jobs, JSON_PRETTY_PRINT))) {
    echo json_encode(['message' => 'Job updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to write to jobs file']);
}
?>