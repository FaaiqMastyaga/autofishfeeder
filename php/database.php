<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_autofishfeeder";
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    function addSchedule($time, $size) {
        // global $servername, $username, $password, $dbname;
        // $conn = new mysqli($servername, $username, $password, $dbname);
    
        // if ($conn->connect_error) {
        //     die("Connection failed: " . $conn->connect_error);
        // }
        
        global $conn;
        $sql = "INSERT INTO schedule (time, size) VALUES ('$time', '$size')";
        
        if ($conn->query($sql)) {
            getSchedule();
        } else {
            echo "Error". $sql ."<br>" . $conn->error;
        }
        $conn->close();
    }
    
    function deleteSchedule($id) {
        // global $servername, $username, $password, $dbname;
        // $conn = new mysqli($servername, $username, $password, $dbname);
        
        // if ($conn->connect_error) {
        //     die("Connection failed: " . $conn->connect_error);
        // }
        
        global $conn;
        $sql = "DELETE FROM schedule WHERE id = $id";
        
        if ($conn->query($sql)) {
            getSchedule();
        } else {
            echo "Error". $sql ."<br>" . $conn->error;
        }
        $conn->close();
    }
    
    function getSchedule() {
        // global $servername, $username, $password, $dbname;
        // $conn = new mysqli($servername, $username, $password, $dbname);
    
        // if ($conn->connect_error) {
        //     die("Connection failed: " . $conn->connect_error);
        // }
        
        global $conn; 
        $sql = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
        $schedule = array();

        while ($row = $sql->fetch_assoc()) {
            $schedule[] = $row;
        }
        echo json_encode($schedule);
        $conn->close();
    }

    function updateFeedingLog($date, $time, $size, $servo) {
        global $conn;
        $sql = "INSERT INTO feeding_log (date, time, size, servo) VALUES ('$date', '$time', '$size', '$servo')";
        $conn->close();
    }
    
    function getOutput() {
        // global $servername, $username, $password, $dbname;
        // $conn = new mysqli($servername, $username, $password, $dbname);
    
        // if ($conn->connect_error) {
        //     die("Connection failed: " . $conn->connect_error);
        // }

        global $conn;
        $sql = $conn->query("SELECT servo FROM feeding_log ORDER BY id DESC LIMIT 1");
        echo json_encode($sql);
        $conn->close();
    }
?>