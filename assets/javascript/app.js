

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

    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      // makes sure the form doesn't act like it should and refresh the page
      event.preventDefault();

      // YOUR TASK!!!
      // logic for storing and retrieving the most recent user.
      // initial data to your Firebase database.
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstArrival = $("#trainTime-input").val().trim();
      arrivalFrequency = $("#frequency-input").val().trim();
      
      var newTrain = {
        trainName: trainName,
        destination: destination,
        firstArrival: firstArrival,
        arrivalFrequency: arrivalFrequency        
      };

      database.ref().push(newTrain);
      
      //alert
      alert("Your train has been added");
      //clear the input fields after submittting a train
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#trainTime-input").val("");
      $("#frequency-input").val("");
    });  

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot,prevChildKey) {

      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var firstArrival = childSnapshot.val().firstArrival;
      var arrivalFrequency = childSnapshot.val().arrivalFrequency;
     

//Code for calculating train arrivals and minutes until
var tFrequency = arrivalFrequency;

// Time is 3:30 AM
var firstTime = firstArrival;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

// Current Time
var currentTime = moment();

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
      
//This writes the data to the Train table on the index page      
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + 
                                "</td><td>" + arrivalFrequency + "</td><td>" + nextTrain + 
                                "</td><td>" + tMinutesTillTrain + "</td></tr>");
      
}); 
    
