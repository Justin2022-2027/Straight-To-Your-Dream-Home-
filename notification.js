let notifications = [];
const notificationList = document.getElementById("notification-list");
const notificationCount = document.getElementById("notification-count");

// Function to toggle the notification dropdown
function toggleNotifications() {
    notificationList.style.display =
        notificationList.style.display === "none" ? "block" : "none";
}

// Function to add a new notification dynamically
function addNotification(message) {
    notifications.push(message);
    updateNotificationUI();
    
    // Play notification sound
    let sound = new Audio('notification.mp3'); // Add a sound file
    sound.play();
}

// Function to update the UI
function updateNotificationUI() {
    notificationList.innerHTML = "";
    
    if (notifications.length === 0) {
        notificationList.innerHTML = "<p class='no-notifications'>No new notifications</p>";
    } else {
        notifications.forEach((msg, index) => {
            let item = document.createElement("div");
            item.classList.add("notification-item");
            item.innerText = msg;
            item.onclick = () => removeNotification(index);
            notificationList.appendChild(item);
        });
    }
    
    notificationCount.innerText = notifications.length;
}

// Function to remove notification on click
function removeNotification(index) {
    notifications.splice(index, 1);
    updateNotificationUI();
}

// Simulate receiving a new notification every 5 seconds
setInterval(() => {
    addNotification("New property listing added! 🏡");
}, 5000);
