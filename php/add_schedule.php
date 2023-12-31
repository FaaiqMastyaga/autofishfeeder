<?php
include("db_config.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $time = $_POST['time'];
    $size = $_POST['size'];

    $sql = "INSERT INTO schedule (time, size) VALUES ('$time', '$size')";

    if ($conn->query($sql)) {
        $result = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
        $schedule = array();

        while ($row = $result->fetch_assoc()) {
            $schedule[] = $row;
        }
        echo json_encode($schedule);
    } else {
        echo json_encode(array('error' => 'Failed to add schedule'));
    }
}

$conn->close();
?>