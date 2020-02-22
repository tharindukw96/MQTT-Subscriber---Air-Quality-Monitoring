const firebase = require("firebase");
var sleep = require('system-sleep');

// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDrxlY_DXZAeC8zuNsQ3bBlC0t25kXMEUM",
    authDomain: "airquality-92528.firebaseapp.com",
    projectId: "airquality-92528"
});

var db = firebase.firestore();

const fs = require('fs');
var student;

fs.readFile('csjson.json', 'utf-8',  function (err, data) {
    if (data) {
        //console.log("Read JSON file: " + data);
        student = data.trim();
        //or data = JSON.parse(JSON.stringify(data.trim()));
        student = JSON.parse(student);
        //console.log(student);
        student.forEach(function (obj) {
            
            db.collection("air_quality_data").doc().set({
                date: obj.Date.slice(0,-1),
                time: obj.Time,
                longitude: obj.longitude,
                latitude: obj.latitude,
                altitude: obj.altitude,
                pm10: obj.PM10,
                pm2_5: obj.PM2_5,
                co: obj.CO,
                no: obj.NO
            }).then(function (docRef) {
                console.log("Document written with ID: ", obj.Time);
            })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
                sleep(500); 
        });
    }
});



