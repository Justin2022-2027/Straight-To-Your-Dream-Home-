<?php
// Database connection
$servername = "localhost";
$username = "root";  // Change this if you have a different username
$password = "";      // Add your database password if any
$dbname = "straight_to_your_dream_home";  // Database name

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully or already exists.<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

// Select the database
$conn->select_db($dbname);

// Create login table
$sql_login = "CREATE TABLE IF NOT EXISTS login (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql_login) === TRUE) {
    echo "Login table created successfully.<br>";
} else {
    echo "Error creating login table: " . $conn->error . "<br>";
}

// Create lessor table
$sql_lessor = "CREATE TABLE IF NOT EXISTS lessor (
    lessor_id INT AUTO_INCREMENT PRIMARY KEY,
    login_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (login_id) REFERENCES login(login_id) ON DELETE CASCADE
)";

if ($conn->query($sql_lessor) === TRUE) {
    echo "Lessor table created successfully.<br>";
} else {
    echo "Error creating lessor table: " . $conn->error . "<br>";
}

$conn->close();
?>