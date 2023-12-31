<?php
include("db_config.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM schedule WHERE id = $id";

    if ($conn->query($sql)) {
        $result = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
        $schedule = array();

        while ($row = $result->fetch_assoc()) {
            $schedule[] = $row;
        }
        echo json_encode($schedule);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>