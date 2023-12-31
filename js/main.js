import { updateClock, getCurrentTime } from "./clock.js";
import { displaySchedule } from "./schedule.js";

export { sendMessage };

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
                sendMessage(size);
            }
        });
    }
}

async function sendMessage(size) {
    const url = "http://192.168.1.100";
    const data = new URLSearchParams({ size });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        });

        if (response.ok) {
            alert(`Feeding - size: ${size}`);
        } else {
            console.error(`Failed to send message to ESP8266. Status code: ${response.status}`);
            alert("Failed to feed.");
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        alert("Failed to feed.");
    }
}
