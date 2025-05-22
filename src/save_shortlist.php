<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['job_id']) || !isset($data['applicant_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing job_id or applicant_id"]);
    exit;
}

$shortlistFile = 'data/shortlists.json';

$shortlists = [];
if (file_exists($shortlistFile)) {
    $json = file_get_contents($shortlistFile);
    $shortlists = json_decode($json, true);
}

$shortlists[] = [
    "applicant_id" => $data['applicant_id'],
    "job_id" => $data['job_id'],
];

if (file_put_contents($shortlistFile, json_encode($shortlists, JSON_PRETTY_PRINT))) {
    echo json_encode(["message" => "Shortlist saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to save shortlist"]);
}
?>
