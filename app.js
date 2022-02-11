//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/Public/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

const jsonData = JSON.stringify(data)
const url = "https://us14.api.mailchimp.com/3.0/lists/e5fab33305"
const options = {
  method: "POST",
  auth: "key:85cef937e494663f6026e90b724451a1-us14",
  }
const request = https.request(url, options, function(response) {

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/Public/success.html");
  } else {
    res.sendFile(__dirname + "/Public/failure.html");
  };
response.on("data", function(data){
  console.log(JSON.parse(data));
})
});
 request.write(jsonData);
 request.end();
});

app.post("/failure", function(req,res) {
  res.redirect("/");
});

app.listen(3000, function() {
        console.log("Server is running!");
      });
// e5fab33305 - list ID
// 71edbbab4640db6191896616a70c9ffd-us14 --- API KEY
