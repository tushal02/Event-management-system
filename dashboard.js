document.addEventListener("DOMContentLoaded", function () {
    let userNameElem = document.getElementById("userName");
    let profileNameElem = document.getElementById("profileName");
    let profileEmailElem = document.getElementById("profileEmail");
    let eventList = document.getElementById("upcomingEvents");
    let activityList = document.getElementById("recentActivity");
    let logoutBtn = document.getElementById("logout");

    // Ensure user session is maintained
    let userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        window.location.href = "index.html"; // Redirect to login if user is not signed in
    }

    function loadProfileData() {
        let userName = localStorage.getItem("userName") || "User";
        userEmail = localStorage.getItem("userEmail") || "john.doe@example.com";

        userNameElem.textContent = userName;
        profileNameElem.textContent = userName;
        profileEmailElem.textContent = userEmail;
    }

    loadProfileData();

    function loadDashboardData() {
        if (!userEmail) return;

        // Retrieve user-specific data
        let userEvents = JSON.parse(localStorage.getItem(`events_${userEmail}`)) || [];
        let userActivity = JSON.parse(localStorage.getItem(`activity_${userEmail}`)) || [];

        // Populate upcoming events
        eventList.innerHTML = userEvents.length
            ? userEvents.map(event => `<li>${event.name} - ${event.date}</li>`).join("")
            : "<li>No upcoming events. <a href='events.html'>Create one now</a>.</li>";

        // Populate recent activity
        activityList.innerHTML = userActivity.length
            ? userActivity.map(log => `<li>${log}</li>`).join("")
            : "<li>You have not performed any activity yet.</li>";
    }

    loadDashboardData();

    // Listen for storage changes across tabs
    window.addEventListener("storage", function (event) {
        if (event.key === `events_${userEmail}` || event.key === `activity_${userEmail}`) {
            loadDashboardData();
        }
    });

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        window.location.href = "index.html";
    });
});
