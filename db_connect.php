<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "straight to your dream home"; // Ensure this matches the database name you created

// Connect to MySQL server and select the database
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Connected to the database server and selected database successfully!<br>";
}
?>
