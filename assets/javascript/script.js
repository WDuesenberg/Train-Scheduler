// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDZFsHldh9rUzt2jNdSLFm2fCe4xttyxwo",
    authDomain: "barontrak2.firebaseapp.com",
    databaseURL: "https://barontrak2.firebaseio.com",
    projectId: "barontrak2",
    storageBucket: "barontrak2.appspot.com",
    messagingSenderId: "416542727130",
    appId: "1:416542727130:web:e0a430abd6bb4206f1fee3",
    measurementId: "G-QV1VZYRFWV"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
console.log(database);

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainNum = $("#train-number-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        train: trainNum,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    $("#train-number-input").val("");
    $("#destination-input").val("");
    $("first-input").val("");
    $("frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainNum = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainNum);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var firstTrainUnixMinutes = moment(firstTrain, "HH:mm").format("X") / 60;
    var rightNow = Math.floor(moment().format("X") / 60);
    var diffNum = rightNow - firstTrainUnixMinutes;
    var minsAway = parseInt(frequency) - (diffNum % parseInt(frequency))
    console.log(minsAway);
    var newTrain = moment((rightNow + minsAway) * 60, "X").format("HH:mm");
    console.log(newTrain);

    // var newTrain = trainMonths * parseInt(frequency);
    // console.log(newTrain);

    var newRow = $('<tr>').append(
        $("<td>").text(trainNum),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(newTrain),
        $("<td>").text(minsAway),

    );

    $("#train-data").append(newRow);
});