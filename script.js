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

// Listen for changes to the button status in Firebase
database.ref("/button").on("value", function(snapshot) {
    var buttonStatus = snapshot.val();
    buttonStatusElement.textContent = buttonStatus;
     // Check if buttonStatus is "press" and show a popup
     if (buttonStatus === "press") {
        $('#myModal').modal('show');
    }
    //  if (buttonStatus === "not press") {
    //     $('#myModal').modal('show');
    // }
});

  // Handle "Turn On LED" button click
    turnOnLEDButton.addEventListener("click", function() {
    // Send a command to turn on the LED in Firebase
    database.ref("/led").set("on");
  
    // Automatically turn off the LED after 3 seconds
    setTimeout(function() {
      database.ref("/led").set("off");
    }, 3000); // 3000 milliseconds (3 seconds)
  });

  // Handle "Turn Off LED" button click
  turnOffLEDButton.addEventListener("click", function() {
    // Send a command to turn off the LED in Firebase
    database.ref("/led").set("off");
  });