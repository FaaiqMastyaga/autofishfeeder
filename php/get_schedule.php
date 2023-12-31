<?php
include("db_config.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
    $schedule = array();

    while ($row = $result->fetch_assoc()) {
        $schedule[] = $row;
    }

    echo json_encode($schedule);
}

$conn->close();
?>
