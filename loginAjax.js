// Much of the  following code is taken from the wiki and modified slightly
function loginAjax(event){

  var username = document.getElementById("username").value; // Get the username from the form
  var password = document.getElementById("password").value;// Get the password from the form


  var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

  //console.log(username);
  //console.log(password);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "login.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  //console.log(event.target.responseText);
  xmlHttp.addEventListener("load", function(event){
    //console.log(event.target.responseText);

    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
    // Hide and or show events on successful login
    document.getElementById("adduser").style.visibility="hidden";
    document.getElementById("logout_btn").style.visibility="visible";
    document.getElementById("loginuser").style.visibility="hidden";
    document.getElementById('categories').style.visibility="visible";
    document.getElementById("csrf_token").value=jsonData.token;
    document.getElementById("categories").style.visibility="visible";

    alert("You've been logged in!");
    // Set the global variable to show that the user has been logged in
    loggedin = true;
    updateCalendar(true);

    // getEvents();


  }
  else{
    alert("You were not logged in.  "+jsonData.message);
  }
}, false); // Bind the callback to the load event
xmlHttp.send(dataString); // Send the data
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click


function registerAjax(event) {
  var newuser = document.getElementById('newuser').value;
  var newpass = document.getElementById('newpass').value;

  var dataString = "username=" + encodeURIComponent(newuser) + "&pass=" + encodeURIComponent(newpass);

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "register.php", true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    var jsonData = JSON.parse(event.target.responseText);
    if (jsonData.success) {
      console.log("trying to hide register");
      alert("Registration success");
      document.getElementById('adduser').style.visibility="hidden";
    }
    else {
      alert("Registration Failed. "+jsonData.message);
    }
  }, false);
  xmlHttp.send(dataString);

}

document.getElementById('registernew').addEventListener('click', registerAjax, false);

function logoutAjax(event) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "logout.php", true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    var jsonData = JSON.parse(event.target.responseText);
    if (jsonData.success) {

      alert("Logout success");
      document.getElementById("loginuser").style.visibility="visible";
      document.getElementById('adduser').style.visibility="visible";
      document.getElementById('logout_btn').style.visibility="hidden";
      document.getElementById('categories').style.visibility="hidden";
      document.getElementById("username").value="";
      document.getElementById("password").value="";
      loggedin = false;
      updateCalendar(false);

    }
    else {
      alert("Logout Failed. "+jsonData.message);
    }
  }, false);
  xmlHttp.send(null);

}

document.getElementById("logout_btn").addEventListener("click", logoutAjax, false);
