export { addSchedule, deleteSchedule, displaySchedule }

async function addSchedule() {
    const timeInput = document.getElementById('time');
    const sizeInput = document.getElementById('size');

    const action = "add_schedule";
    const time = timeInput.value.trim();
    const size = sizeInput.value;
    
    if (time === "") {
        alert("Please select a time");
        return;
    }

    const response = await fetch('./php/outputs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=${action}&time=${time}&size=${size}`,
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
    const action = "delete_schedule";

    const response = await fetch('./php/outputs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=${action}&id=${id}`,
    });
    
    if (response.ok) {
        console.log('Successfully delete schedule');
        displaySchedule();
    } else {
        console.error('Failed to delete schedule');
    }
}

async function displaySchedule() {
    const action = "get_schedule";

    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = '';

    const xhr = new XMLHttpRequest();
    const url = `./php/outputs.php?action=${action}`;

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const schedule = JSON.parse(xhr.responseText);
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
    };

    xhr.send();
}