document.addEventListener("DOMContentLoaded", function () {
    let nameField = document.getElementById("profileName");
    let emailField = document.getElementById("profileEmail");

    function loadProfileData() {
        nameField.textContent = localStorage.getItem("userName") || "John Doe";
        emailField.textContent = localStorage.getItem("userEmail") || "john.doe@example.com";
    }

    loadProfileData();

    document.getElementById("editProfile").addEventListener("click", function () {
        let newName = prompt("Enter new name:", nameField.textContent);
        if (newName) {
            localStorage.setItem("userName", newName);
            nameField.textContent = newName;
            updateDashboard("userName", newName);
        }

        let newEmail = prompt("Enter new email:", emailField.textContent);
        if (newEmail) {
            localStorage.setItem("userEmail", newEmail);
            emailField.textContent = newEmail;
            updateDashboard("userEmail", newEmail);
        }
    });

    function updateDashboard(key, value) {
        let elem = document.getElementById(key);
        if (elem) elem.textContent = value;

        window.dispatchEvent(new StorageEvent("storage", { key: key, newValue: value }));
    }
});
