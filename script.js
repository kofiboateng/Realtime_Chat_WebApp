// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDn_57Kjgm-_VXXGlaWrg9VSDA4QGs3YiE",
    authDomain: "chatbox-66720.firebaseapp.com",
    databaseURL: "https://chatbox-66720-default-rtdb.firebaseio.com",
    projectId: "chatbox-66720",
    storageBucket: "chatbox-66720.appspot.com",
    messagingSenderId: "646333459317",
    appId: "1:646333459317:web:6efedbabced1c37f24813c"
  };

// Initialize Firebase  
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let username = document.getElementById("username");
let message = document.getElementById("message");
let messages = document.getElementById("messages");

username.value = localStorage.getItem("username");

message.addEventListener('keypress', function(e) {
  if(e.key == "Enter") {

    localStorage.setItem("username", username.value);

    database.ref("messages").push({
      username: username.value,
      message: message.value
    })

    message.value = "";
  }
})

//whenever an element added underneath messages in database
database.ref("messages").on('child_added', function(e) {
  let data = e.val();
  console.log(data);

  let div = document.createElement("div");
  let span = document.createElement("span");
  span.innerHTML = "@" + data.username;
  let p = document.createElement("p");
  p.innerHTML = data.message;

  div.appendChild(span);
  div.appendChild(p);

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
})