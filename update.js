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

var ref = db.collection("/air_quality_data").get().then((snapshot) => {
    var dataList = [];
    snapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data());
        updateDoc(doc.id,doc.data());
    })
}).catch((err) => {
    console.log('Error getting documents', err);
});

function updateDoc(id, doc){
    var ref = db.collection("/air_quality_data").doc(id);
    var newVal;
    if(doc['pm10']>500){
        newVal = parseInt(400+Math.random()*100);
        ref.update({'pm10' : newVal});
    }
    if(doc['pm2_5'] > 200){
        newVal = parseInt(100+Math.random()*100);
        ref.update({'pm2_5' : newVal});
    }
}