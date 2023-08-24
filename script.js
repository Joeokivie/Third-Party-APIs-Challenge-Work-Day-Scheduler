document.addEventListener("DOMContentLoaded", function () {
  const currentDayElement = document.getElementById("currentDay");
  const timeblocksElement = document.querySelector(".timeblocks");
  const businessHours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];

  function initializePlanner() {
    const currentDate = new Date();
    currentDayElement.textContent = currentDate.toDateString();

    for (const hour of businessHours) {
      const timeblock = createTimeblock(hour);
      timeblocksElement.appendChild(timeblock);
    }
  }

  function createTimeblock(hour) {
    const timeblock = document.createElement("div");
    timeblock.classList.add("timeblock");
    timeblock.dataset.hour = hour;

    colorCodeTimeblock(timeblock);

    timeblock.addEventListener("click", editEvent);

    const savedEvent = localStorage.getItem(hour);
    if (savedEvent) {
      timeblock.innerHTML = `<p>${savedEvent}</p>`;
    }

    return timeblock;
  }

  function colorCodeTimeblock(timeblock) {
    const currentHour = new Date().getHours();
    const timeblockHour = parseInt(timeblock.dataset.hour);

    if (currentHour < timeblockHour) {
      timeblock.classList.add("future");
    } else if (currentHour === timeblockHour) {
      timeblock.classList.add("present");
    } else {
      timeblock.classList.add("past");
    }
  }

  function editEvent(event) {
    const timeblock = event.currentTarget;
    const hour = timeblock.dataset.hour;
    let eventDescription = prompt(`Enter an event for ${hour}:`);
    if (eventDescription !== null) {
      timeblock.innerHTML = `<p>${eventDescription}</p>`;
      saveEvent(hour, eventDescription);
    }
  }

  function saveEvent(hour, eventDescription) {
    localStorage.setItem(hour, eventDescription);
  }

  initializePlanner();
});
