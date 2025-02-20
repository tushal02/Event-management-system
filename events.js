// Ensure a user is logged in
let userEmail = localStorage.getItem("userEmail");

// If no user is logged in, redirect to login page
if (!userEmail) {
    window.location.href = "index.html";
}

// Retrieve user-specific events
let events = JSON.parse(localStorage.getItem(`events_${userEmail}`)) || [];
let activityLog = JSON.parse(localStorage.getItem(`activity_${userEmail}`)) || [];

// DOM Elements
const eventForm = document.getElementById("eventForm");
const eventsContainer = document.getElementById("eventsContainer");

// Render events on page load
function renderEvents() {
  eventsContainer.innerHTML = "";
  events.forEach((event, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${event.name}</h3>
      <p>${event.date}</p>
      <p>${event.description}</p>
      <button onclick="deleteEvent(${index})">Delete</button>
    `;
    eventsContainer.appendChild(li);
  });
}

// Delete event by index
function deleteEvent(index) {
  let deletedEvent = events[index]; // Save event details before deleting
  events.splice(index, 1);
  localStorage.setItem(`events_${userEmail}`, JSON.stringify(events));

  // Add delete activity log
  activityLog.push(`Deleted event: ${deletedEvent.name}`);
  localStorage.setItem(`activity_${userEmail}`, JSON.stringify(activityLog));

  renderEvents();
}

// Handle event form submission
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const eventName = document.getElementById("eventName").value.trim();
  const eventDate = document.getElementById("eventDate").value;
  const eventDesc = document.getElementById("eventDesc").value.trim();

  if (eventName && eventDate && eventDesc) {
    const newEvent = { name: eventName, date: eventDate, description: eventDesc };
    events.push(newEvent);
    localStorage.setItem(`events_${userEmail}`, JSON.stringify(events));

    // Add new event to recent activity
    activityLog.push(`Added event: ${eventName}`);
    localStorage.setItem(`activity_${userEmail}`, JSON.stringify(activityLog));

    renderEvents();
    eventForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

// Initial render
renderEvents();
