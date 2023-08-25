// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentHour = dayjs().format("HH"); 
const timeBlockArray = ["09", "10", "11", "12", "13", "14", "15", "16", "17"]; 
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
console.log(currentDay);
console.log(saveBtn);

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // Function to create a time block
function createTimeblock(hour) {
  const timeblock = $("<div>")
    .addClass("time-block") // Changed the class to "time-block" to match your existing code
    .attr("data-hour", hour);

  colorCodeTimeblock(timeblock);

  // Function to get the saved event description from local storage
  function getEventDescription(hour) {
    return localStorage.getItem(hour) || "";
  }

  const eventDescription = getEventDescription(hour);

  const eventInput = $("<textarea>") // Changed from input to textarea for a description
    .addClass("description") // Changed the class to "description" to match your existing code
    .val(eventDescription);

  const saveButton = $("<button>")
    .addClass("saveBtn") // Changed the class to "saveBtn" to match your existing code
    .text("Save");
  console.log(saveButton);
  saveButton.on("click", function () {
    const hourId = $(this).closest(".time-block").attr("data-hour");
    const userInput = $(this).siblings(".description").val(); // Changed the selector to ".description"
    saveEvent(hourId, userInput);
  });

  timeblock.append(eventInput, saveButton);

  return timeblock;
}


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
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
// Function to update time block colors based on the current hour
// Function to update time block colors based on the current hour
function updateBlockColors() {
  const blockHour = parseInt($(this).attr("id")); // Parse the block hour as an integer

  timeBlock.each(function () {
    const blockHour = parseInt($(this).attr("id"));
    if (blockHour < currentHour) {
      // This time block is in the past
      $(this).addClass("past").removeClass("present future");
    } else if (blockHour === currentHour) {
      // This time block is the current hour
      $(this).addClass("present").removeClass("past future");
    } else if (blockHour >= 13 && blockHour <= 17) {
      // This time block is between 1 pm and 5 pm
      $(this).addClass("future").removeClass("past present");
    } else if (blockHour> currentHour){
      // This time block is in the future
      $(this).addClass("future").removeClass("past present");
    }
  });

  // Special case for 12 pm
  if (currentHour === 12) {
    $("#hour12").removeClass("past future").addClass("present");
  }
}

// Call the function to update time block colors
updateBlockColors();




 // Function to display the current date in the page header
function displayCurrentDate() {
  const formattedDate = dayjs().format("dddd, MMM D, YYYY"); // Get the current date in the specified format

  currentDay.text(formattedDate); // Set the formatted date in the page header
}

// Call the function to display the current date
displayCurrentDate();

});