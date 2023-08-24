// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let currentHour = dayjs().format("HH"); //hour of the day
const timeBlockArray = ["09", "10", "11", "12", "13", "14", "15", "16", "17"]; //had to change my hours after 12 to military time so class condition statement could work correctly
var currentDay = $("#currentDay");
var timeBlock = $(".time-block");
var hour9 = $("#hour9");
var hour10 = $("#hour10");
var hour11 = $("#hour11");
var hour12 = $("#hour12");
var hour1 = $("#hour1");
var hour2 = $("#hour2");
var hour3 = $("#hour3");
var hour4 = $("#hour4");
var hour5 = $("#hour5");
var saveBtn = $(".saveBtn");
var Input = $(".description");

console.log(currentHour);

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function createTimeblock(hour) {
    const timeblock = $("<div>").addClass("timeblock").attr("data-hour", hour);
  
    colorCodeTimeblock(timeblock);
  
    const eventDescription = getEventDescription(hour);
    const eventInput = $("<input>")
      .addClass("event-input")
      .val(eventDescription);
  
    const saveButton = $("<button>")
      .addClass("save-button")
      .text("Save");
  
    saveButton.on("click", function () {
      const hourId = $(this).closest(".timeblock").attr("data-hour");
      const userInput = $(this).siblings(".event-input").val();
      saveEvent(hourId, userInput);
    });
  
    timeblock.append(eventInput, saveButton);
  
    return timeblock;
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
 // Function to populate textarea elements with saved user input
// Function to populate textarea elements with saved user input
function populateSavedEvents() {
  timeBlock.each(function () {
    const blockHour = $(this).attr("data-hour");
    const savedEvent = localStorage.getItem(blockHour);

    // Find the textarea element within the current time-block and set its value
    $(this).find(".description").val(savedEvent || "");
  });
}

// Call the function to populate the textarea elements with saved data
populateSavedEvents();

// Call the function to populate the textarea elements with saved data
populateSavedEvents();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

 // Loop through each id in the timeBlockArray
for (const id of timeBlockArray) {
  // Compare the id with the current hour
  if (id < currentHour) {
    // If the id is in the past, apply the 'past' class (gray color)
    $(`#${id}`).addClass("past");
  } else if (id === currentHour) {
    // If the id matches the current hour, apply the 'present' class (red color)
    $(`#${id}`).addClass("present");
  } else if (id > currentHour) {
    // If the id is in the future, apply the 'future' class (green color)
    $(`#${id}`).addClass("future");
  }
}

  // TODO: Add code to display the current date in the header of the page.
// Function to display the current date in the header
function displayCurrentDate() {
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  currentDay.text(currentDate);
}

// Call the function to display the current date in the header
displayCurrentDate();

});