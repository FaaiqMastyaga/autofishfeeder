export { updateClock, getCurrentTime, getCurrentDate };

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

function getCurrentDate() {
    const currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}