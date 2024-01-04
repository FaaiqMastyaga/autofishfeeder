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
    const action = "get_schedule";
    const currentTime = getCurrentTime();
    
    const response = await fetch(`./php/outputs.php?action=${action}`, {
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
    
            if (currentTime == scheduleTime) {
                updateFeedingLog(size);
            }
        });
    } 
}

async function updateFeedingLog(size) {
    const action = "update_feeding_log";
    const date = getCurrentDate();
    const time = getCurrentTime();
    let servo;

    console.log(date);
    console.log(time);
    console.log(size);

    if (size == "small") {
        servo = 45;
    } else if (size == "medium") {
        servo = 90;
    } else if (size == "large") {
        servo = 135;
    }

    const response = await fetch(`./php/outputs.php?action=${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `date=${date}&time=${time}&size=${size}&servo=${servo}`,
    });
    
    if (response.ok) {
        console.log(`Successfully feeding - Size: ${size}`);
        alert(`Successfully feeding - Size: ${size}`);
        displaySchedule();
    } else {
        console.error('Failed feeding');
        alert('Failed feeding');
    }
}