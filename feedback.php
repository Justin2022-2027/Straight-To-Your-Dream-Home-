<?php
// submit_feedback.php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$comment = $data['comment'];
$user_id = 1; // Assuming user_id is 1 for this example

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Straight To Your Dream Home";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert feedback into the database
$stmt = $conn->prepare("INSERT INTO feedback (user_id, comment) VALUES (?, ?)");
$stmt->bind_param("is", $user_id, $comment);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();
?>