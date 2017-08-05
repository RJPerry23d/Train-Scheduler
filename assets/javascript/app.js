

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

                                                        // // Initial Values
                                                        // var initTrainName = "";
                                                        // var initDestination = "";
                                                        // var initFirstArrival = "";
                                                        // var initArrivalFrequency = "";
                                                        // var initTMinutesTillTrain = "";
                                                        // var initNextTr = "";

    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstArrival = $("#trainTime-input").val().trim();
      arrivalFrequency = $("#frequency-input").val().trim();
      // nextTr = $("#next-arrival-display").val();
      // tMinutesTillTrain = $("#minutes-until-display").val();

      var newTrain = {
        trainName: trainName,
        destination: destination,
        firstArrival: firstArrival,
        arrivalFrequency: arrivalFrequency        
      };

      database.ref().push(newTrain);
      console.log(newTrain.trainName);
      console.log(newTrain.destination);
      console.log(newTrain.firstArrival);
      console.log(newTrain.arrivalFrequency);

      //alert
      alert("Train added");
      //clear
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#trainTime-input").val("");
      $("#frequency-input").val("");
    });
    


   

   

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot,prevChildKey) {

      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var firstArrival = childSnapshot.val().firstArrival;
      var arrivalFrequency = childSnapshot.val().arrivalFrequency;

      console.log(trainName);
      console.log(destination);
      console.log(firstArrival);
      console.log(arrivalFrequency);
      

    // Assumptions

var tFrequency = arrivalFrequency;

// Time is 3:30 AM
var firstTime = firstArrival;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



      
      // console.log(snapshot.val().trainName);
      // console.log(snapshot.val().destination);
      // console.log(snapshot.val().firstArrival);
      // console.log(snapshot.val().arrivalFrequency);

      // // Change the HTML to reflect
      // $("#name-display").text(trainName);
      // $("#destination-display").text(destination);
      // //$("#arrival-display").text(firstArrival);
      // $("#frequency-display").text(arrivalFrequency);
      // $("#next-arrival-display").text(nextTr);
      // console.log(nextTr);
      // $("#minutes-until-display").text(tMinutesTillTrain);
      // console.log(tMinutesTillTrain);
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + 
                                      "</td><td>" + arrivalFrequency + "</td><td>" + nextTrain + 
                                      "</td><td>" + tMinutesTillTrain + "</td></tr>");



      // Handle the errors
    }); 
    //1- get current time (military)
        //2- get train start (military)
        //3- subtract train start from current time to get the difference  (not sure what to do about minutes)
        //4- multiply the difference * 60 to get the total number of minutes (totalMinutes) 
        //5- divide totalMinutes by the train frequency (minuteDif)
        //6- subtract Math.floor(minuteDif) from 60 to get Minutes Away
