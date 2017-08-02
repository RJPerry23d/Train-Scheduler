

// Initialize Firebase
    // This is the code we copied and pasted from our app page
    var config = {
    apiKey: "AIzaSyD6-7XKAzV1iPhi1H1IDhpQXvzWdL-Q9qQ",
    authDomain: "train-schedule-7fe1a.firebaseapp.com",
    databaseURL: "https://train-schedule-7fe1a.firebaseio.com",
    projectId: "train-schedule-7fe1a",
    storageBucket: "train-schedule-7fe1a.appspot.com",
    messagingSenderId: "844784936208"
  };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstArrival = "";
    var arrivalFrequency = "";

    // Capture Button Click
    $("#add-train").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstArrival = $("#trainTime-input").val().trim();
      arrivalFrequency = $("#frequency-input").val().trim();

      database.ref().set({
        trainName: trainName,
        destination: destination,
        firstArrival: firstArrival,
        arrivalFrequency: arrivalFrequency
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstArrival);
      console.log(snapshot.val().arrivalFrequency);

      // Change the HTML to reflect
      $("#name-display").text(snapshot.val().trainName);
      $("#destination-display").text(snapshot.val().destination);
      $("#arrival-display").text(snapshot.val().firstArrival);
      $("#frequency-display").text(snapshot.val().arrivalFrequency);



      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });