<?php
    include_once("./database.php");

    $action = $id = $time = $size = "";

    if ($_SERVER("REQUEST METHOD") == "POST") {
        $action = $_POST["action"];

        if ($action == "add_schedule") {
            $time = $_POST['time'];
            $size = $_POST['size'];
            addSchedule($time, $size);
        } 
        else if ($action == "delete_schedule") {
            $id = $_POST["id"];
            deleteSchedule($id);
        }
        else if ($action == "update_feeding_log") {
            $date = $_POST["date"];
            $time = $_POST["time"];
            $size = $_POST["size"];
            $servo = $_POST["servo"];
            updateFeedingLog($date, $time, $size, $servo);
        }
        else {
            echo "No data posted with HTTP POST.";
        }
    } 
    
    if ($_SERVER("REQUEST METHOD") == "GET") {
        $action = $_GET["action"];
        $action = trim($action);
        $action = stripslashes($action);
        $action = htmlspecialchars($action);
        
        if ($action == "get_schedule") {
            getSchedule();
        }
        else if ($action == "get_output") {
            getOutput();
        }
        else {
            echo "Invalid HTTP request.";
        }
    }
?>