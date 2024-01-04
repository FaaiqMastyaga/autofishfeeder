<?php
    $servername = "localhost";
    $username = "id21733251_root";
    $password = "Plmokn098*";
    $dbname = "id21733251_db_autofishfeeder";

    function addSchedule($time, $size) {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "INSERT INTO schedule (time, size) VALUES ('$time', '$size')";
        
        if ($conn->query($sql)) {
            $result = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
            $schedule = array();

            while ($row = $result->fetch_assoc()) {
                $schedule[] = $row;
            }

            echo json_encode($schedule);
        } else {
            echo "Error". $sql ."<br>" . $conn->error;
        }
        $conn->close();
    }
    
    function deleteSchedule($id) {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "DELETE FROM schedule WHERE id = $id";
        
        if ($conn->query($sql)) {
            $result = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
            $schedule = array();

            while ($row = $result->fetch_assoc()) {
                $schedule[] = $row;
            }

            echo json_encode($schedule);
        } else {
            echo "Error". $sql ."<br>" . $conn->error;
        }
        $conn->close();
    }
    
    function getSchedule() {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = $conn->query("SELECT * FROM schedule ORDER BY time ASC");
        $schedule = array();

        while ($row = $sql->fetch_assoc()) {
            $schedule[] = $row;
        }
        echo json_encode($schedule);
        $conn->close();
    }

    function updateFeedingLog($date, $time, $size, $servo) {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO feeding_log (date, time, size, servo) VALUES ('$date', '$time', '$size', '$servo')";

        if ($conn->query($sql)) {
            $result = $conn->query("SELECT * FROM feeding_log ORDER BY id DESC");
            $feeding_log = array();

            while ($row = $result->fetch_assoc()) {
                $feeding_log[] = $row;
            }
            echo json_encode($feeding_log);
        } else {
            echo "Error: " . $sql ."<br>". $conn->error;
        }
        $conn->close();
    }
    
    function getOutput() {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    
        $result = $conn->query("SELECT servo FROM feeding_log ORDER BY id DESC LIMIT 1");
    
        if ($result) {
            // Ambil satu baris terakhir dari hasil query
            $row = $result->fetch_assoc();
    
            // Output dalam format JSON
            echo json_encode($row);
        } else {
            // Tampilkan pesan error jika query gagal dieksekusi
            echo "Error: " . $conn->error;
        }
    
        $conn->close();
    }    
?>