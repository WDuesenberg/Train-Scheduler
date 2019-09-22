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