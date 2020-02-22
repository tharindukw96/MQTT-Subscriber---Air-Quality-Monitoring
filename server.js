const firebase = require("firebase");


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDrxlY_DXZAeC8zuNsQ3bBlC0t25kXMEUM",
    authDomain: "airquality-92528.firebaseapp.com",
    projectId: "airquality-92528"
});

var db = firebase.firestore();

//MQTT broker connection
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com:1883')
client.on('connect', function () {
    client.subscribe('test_topic_1');
});

//pm2.5,pm10,co,no2
client.on('message', function (topic, message) {
    var context = message.toString();
    if (context) {
        var str = context.slice(0, 24);
        var data = str.split(',');
        
        //Change the outlier data
        if(data[1]>500){
            data[1] = parseInt(400+Math.random()*100);
        }
        if(data[0] > 200){
            data[0] = parseInt(100+Math.random()*100);
        }
        
        db.collection("air_quality_data_1").doc().set({
            date: new Date(),
            time: parseInt(Date.now()),
            longitude: '',
            latitude: '',
            altitude: '',
            pm10: data[1],
            pm2_5: data[0],
            co: data[2],
            no: data[3]
        }).then(function (docRef) {
            console.log("Document written"+getTime());
        }).catch(function (error) {
                console.error("Error adding document: ", error);
        });
    }


});

// current date
// adjust 0 before single digit date
function getDate() {
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    var year = date_ob.getFullYear();
    return new Date(year,month, date);
}


function getTime() {
    var date_ob = new Date();
    // current hours
    var  hours = date_ob.getHours();

    // current minutes
    var minutes = date_ob.getMinutes();

    // current seconds
    var seconds = date_ob.getSeconds();

    return hours+":"+minutes+":"+seconds;
}
