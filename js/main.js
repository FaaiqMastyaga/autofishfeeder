import { updateClock, getCurrentTime, getCurrentDate } from "./clock.js";
import { displaySchedule } from "./schedule.js";

export { updateFeedingLog };

document.addEventListener("DOMContentLoaded", () => {
    displaySchedule();
    checkSchedule();
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(checkSchedule, 1000);
});

async function checkSchedule() {
    const currentTime = getCurrentTime();
    
    const response = await fetch('./php/get_schedule.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const schedule = await response.json();
        schedule.forEach(event => {
            let scheduleTime = event.time;
            scheduleTime += ':00';
            const size = event.size;

            if (currentTime === scheduleTime) {
                feed(size);
            }
        });
    }
}

// function updateFeedingLog(size) {
//     const xhr = new XMLHttpRequest();
//     const url = "http://192.168.1.100/";
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//     const data = `size=${size}`;

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             console.log(xhr.responseText);
//         }
//     };
//     xhr.send(data);
// }


// async function updateFeedingLog(size) {
//     const url = "https://autofishfeeder.000webhostapp.com/";
//     const data = new URLSearchParams({ size });

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: data,
//         });

//         if (response.ok) {
//             alert(`Feeding - size: ${size}`);
//         } else {
//             console.error(`Failed to send message to ESP8266. Status code: ${response.status}`);
//             alert("Failed to feed.");
//         }
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         alert("Failed to feed.");
//     }
// }

async function updateFeedingLog(size) {
    const action = "update_feeding_log";
    const date = getCurrentDate();
    const time = getCurrentTime();
    let servo;

    if (size == "small") {
        servo = 45;
    } else if (size == "medium") {
        servo = 90;
    } else if (size == "large") {
        servo = 135;
    }

    const response = await fetch('./php/outputs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=${action}&${date}&time=${time}&size=${size}&servo=${servo}`,
    });
    
    if (response.ok) {
        console.log('Successfully feeding');
        displaySchedule();
    } else {
        console.error('Failed feeding');
    }
}