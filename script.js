// Get reference to the input box for tasks
const inputBox = document.getElementById("input-box");

// Get reference to the input box for due date
const dueDateInput = document.getElementById("due-date");

// Get reference to the container for the task list
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    // Check if the input box is empty
    if (inputBox.value === '') {
        // Show an alert if no task is entered
        alert("You must write something!");
    } else {
        // Create a new list item for the task
        let li = document.createElement("li");

        // Set the content of the list item with task and due date
        li.innerHTML = inputBox.value + " - Due: " + dueDateInput.value;

        // Create a subtasks list for the task
        let subtasks = document.createElement("ul");
        li.appendChild(subtasks);

        // Create an input box for subtasks
        let subtaskInput = document.createElement("input");
        subtaskInput.type = "text";
        subtasks.appendChild(subtaskInput);

        // Create a button to add subtasks
        let subtaskAddBtn = document.createElement("button");
        subtaskAddBtn.innerHTML = "Add Subtask";
        subtaskAddBtn.addEventListener("click", function() {
            // Create a new subtask item
            let subtaskItem = document.createElement("li");
            subtaskItem.innerHTML = subtaskInput.value;
            subtasks.appendChild(subtaskItem);
            subtaskInput.value = "";
        });
        subtasks.appendChild(subtaskAddBtn);

        // Create a color picker for the task
        let colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.addEventListener("input", function() {
            // Set the background color of the task
            li.style.backgroundColor = colorPicker.value;
            saveData();
        });
        li.appendChild(colorPicker);

        // Create a close button for the task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Add the task to the task list container
        listContainer.appendChild(li);
    }

    // Clear input values and save data
    inputBox.value = "";
    dueDateInput.value = "";
    saveData();
}

// Event listener for clicking on the task list
listContainer.addEventListener("click", function(e) {
    // Check if the clicked element is a list item
    if (e.target.tagName === "LI") {
        // Toggle the 'checked' class for the task
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // Remove the parent element (task) when clicking the close button
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save task data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display tasks from local storage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call the showTask function to display tasks on page load
showTask();