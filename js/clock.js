export { updateClock, getCurrentTime };

function updateClock() {
    const clockElement = document.getElementById('clock');
    const currentTime = getCurrentTime();
    clockElement.textContent = `Current Time: ${currentTime}`;
}

function getCurrentTime() {
    // Get current time (including date, month, year)
    const currentTime = new Date();
    // Set timezone to Indonesia
    const options = { timeZone: 'Asia/Jakarta', hour12: false };
    // Format time to HH:mm
    const formattedTime = currentTime.toLocaleTimeString('en-US', options);

    return formattedTime;
}