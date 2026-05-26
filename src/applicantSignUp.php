<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$filePath = 'data/applicants.json';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name'], $data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$applicants = [];
if (file_exists($filePath)) {
    $jsonContent = file_get_contents($filePath);
    if (!empty($jsonContent)) {
        $applicants = json_decode($jsonContent, true);
    }
}

foreach ($applicants as $applicant) {
    if ($applicant['email'] === $data['email']) {
        http_response_code(409);
        echo json_encode(['error' => 'An applicant with this email already exists.']);
        exit;
    }
}

$lastId = 0;
if (!empty($applicants)) {
    $lastApplicantId = end($applicants)['applicant_id'];
    $newApplicantId = strval(intval($lastApplicantId) + 1);
} else {
    $newApplicantId = "1";
}

$newApplicant = [
    'applicant_id' => $newApplicantId,
    'name' => $data['name'],
    'email' => $data['email'],
    'password' => $data['password'],
];

$applicants[] = $newApplicant;

file_put_contents($filePath, json_encode($applicants, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Applicant successfully added.', "applicant_id" => $newApplicantId]);
?>
