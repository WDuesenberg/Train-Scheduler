// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBOWkJNsR-YniUij21MvM8X0xN6ramrJLo",
    authDomain: "barontrak.firebaseapp.com",
    databaseURL: "https://barontrak.firebaseio.com",
    projectId: "barontrak",
    storageBucket: "barontrak.appspot.com",
    messagingSenderId: "327793890004",
    appId: "1:327793890004:web:f8c9af773058530c64e141"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
console.log(database);

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainNum = $("#train-number-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");
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

    var firstTrainPretty = moment.unix(firstTrain).format("MM/DD/YYYY");

    var trainMonths = moment().diff(moment(firstTrain, "X"), "months");
    console.log(trainMonths);

    var newTrain = trainMonths * frequency;
    console.log(newTrain);

    var newRow = $('<tr>').append(
        $("<td>").text(trainNum),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency),
        $("<td>").text(minutesAway),
        // $("<td>").text(),
    );

    $("#train-data > tbody").append(newRow);
});