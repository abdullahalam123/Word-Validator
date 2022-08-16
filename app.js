const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index", {
    title: ""
  });
});

app.post("/", function(req, res) {
  const query = req.body.word;
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + query;

  https.get(url, function(response) {

    if (response.statusCode === 200) {
      res.render("index", {
        title: "It exists"
      });
    } else {
      res.render("index", {
        title: "Oops it doesn't exist"
      });
    }

    // this can be used to show the meaning in case the word exists
    // response.on("data", function(data) {
    //   const wordData = JSON.parse(data);
    // console.log(wordData.meanings[0].definitions[0].definition)
    // });
  });
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
