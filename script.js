  // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXkg1sXjCxC4Gb8OrojMYQ61CxWfloPwg",
    authDomain: "shoot-enemy-f02f9.firebaseapp.com",
    databaseURL: "https://shoot-enemy-f02f9-default-rtdb.firebaseio.com",
    projectId: "shoot-enemy-f02f9",
    storageBucket: "shoot-enemy-f02f9.appspot.com",
    messagingSenderId: "277972412348",
    appId: "1:277972412348:web:b7fd4641f9929ad7efedb9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();

// Get reference to the button status element
var buttonStatusElement = document.getElementById("buttonStatus");

// Get references to the "Turn On LED" and "Turn Off LED" buttons
var turnOnLEDButton = document.getElementById("turnOnLED");
var turnOffLEDButton = document.getElementById("turnOffLED");
var ledStatusElement = document.getElementById("ledStatus"); // Assuming this is your LED status element

var modalShown = false; // Flag to track if the modal has been shown
var ledTimer; // Timer for turning on the LED

// Function to show the modal and start the timer
function showModalAndStartTimer() {
    if (!modalShown) {
        $('#myModal').modal('show');
        modalShown = true;
        
        // Set a timer to turn on the LED after 5 seconds if no action is taken
        ledTimer = setTimeout(function() {
            // Send a command to turn on the LED in Firebase
            database.ref("/led").set("on");
            modalShown = false; // Reset the flag
        }, 5000); // 5000 milliseconds = 5 seconds
    }
}

// Listen for changes to the button status in Firebase
database.ref("/button").on("value", function(snapshot) {
    var buttonStatus = snapshot.val();
    buttonStatusElement.textContent = buttonStatus;

    // Check if buttonStatus is "press" and show a popup
    if (buttonStatus === "press") {
        showModalAndStartTimer();
    } else if (buttonStatus === "not press") {
        // If buttonStatus changes to "not press," turn off the LED
        database.ref("/led").set("off");
    }
});

// Handle "Turn On LED" button click
turnOnLEDButton.addEventListener("click", function() {
    // Send a command to turn on the LED in Firebase
    database.ref("/led").set("on");
    
    // Cancel the LED timer if the button is pressed
    clearTimeout(ledTimer);
    modalShown = false; // Reset the flag
});

// Handle "Turn Off LED" button click
    turnOffLEDButton.addEventListener("click", function() {
    // Send a command to turn off the LED in Firebase
    database.ref("/led").set("off");
    modalShown = false; // Reset the flag
});