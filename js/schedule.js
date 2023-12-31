export { addSchedule, deleteSchedule, displaySchedule }

async function addSchedule() {
    const timeInput = document.getElementById('time');
    const sizeInput = document.getElementById('size');

    const time = timeInput.value.trim();
    const size = sizeInput.value;
    
    if (time === "") {
        alert("Please select a time");
        return;
    }

    const response = await fetch('./php/add_schedule.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `time=${time}&size=${size}`,
    });
    
    if (response.ok) {
        console.log('Successfully add schedule');
        displaySchedule();
    } else {
        console.error('Failed to add schedule');
    }

    timeInput.value = '';
    sizeInput.value = 'small';
}

async function deleteSchedule(id) {
    const response = await fetch('./php/delete_schedule.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}`,
    });
    
    if (response.ok) {
        console.log('Successfully delete schedule');
        displaySchedule();
    } else {
        console.error('Failed to delete schedule');
    }
}

async function displaySchedule() {
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = '';

    const response = await fetch('./php/get_schedule.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const schedule = await response.json();
        schedule.forEach(event => {
            // // Create list and its element
            const listItem = document.createElement('li');
            const eventInfo = document.createElement("div");
            const buttonContainer = document.createElement("div");
            const deleteButton = document.createElement("button");
    
            eventInfo.textContent = `Pukul ${event.time} - Size: ${event.size}`;
    
            buttonContainer.classList.add("button-container");
            
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = () => {
                deleteSchedule(event.id);
            };
            
            listItem.appendChild(eventInfo);
            listItem.appendChild(buttonContainer);
            buttonContainer.appendChild(deleteButton);
        
            scheduleList.appendChild(listItem);
        });
    } else {
        console.error('Failed to fetch schedule');
    }
}