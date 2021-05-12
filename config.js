 // Set the configuration for your app
  var config = {
    apiKey: "AIzaSyDAankiYDzC3rw_3j34MtITjXt7PMG3QGU",
    authDomain: "x691webapp.firebaseapp.com",
    databaseURL: "https://x691webapp-default-rtdb.firebaseio.com",
    storageBucket: "x691webapp.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  // read or write data
  // https://firebase.google.com/docs/database/web/read-and-write


//working with currently: read data from firebase to our files


//   function retrieveInfo() {
//     let ref = firebase.database().ref("Projects");
//     ref.on("value",gotData);
//   }

// function gotData(data) {
//   let info = data.val();
//   let keys = Object.keys(info);

//   for (let i=0;i<keys.length;i++) {
//     let infoData = keys[infoData]
//     let descShort = keys[infoData].desc-short
//     let descLong = keys[infoData].desc-long;
//     let type = keys[infoData].type
//     let teamLeader = keys[infoData].teamleader
//     let client = keys[infoData].client
//     let term = keys[infoData].term
//     let title = keys[infoData].title
//     let status = keys[infoData].status
//     console.log(descShort,descLong,type,teamLeader,client,term,title,status)

//   }
// }
