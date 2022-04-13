const { triggerAsyncId } = require("async_hooks");
const yargs = require("yargs");
const { fetchData } = require("./2-http-requests");

//calling fetchdata
fetchData("vijaawada", (error, response) => {
  if (error) {
    console.log("error occured and its message is ", error.message);
  } else {
    console.log("Humidity of the place is", response);
  }
});

const hbs = require("hbs");
const express = require("express");
const exp = require("constants");
const app = express();
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/partials");
app.use(express.static(__dirname + "/public"));
app.use("/js", express.static(__dirname + "/public/js"));
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server listening on port 3001");
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/home", (req, res) => {
  res.render("home", { title: "Home Page" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact US" });
});

// for weather data fetching and giving back to client
app.get("/weather", (req, res) => {
  // check the req contains the query string of some city name or not
  if (!req.query.search) {
    // there is no such thing ?search=vizag like in the req from client
    return res.send({
      Error: "pls input some city name in the text field and try again",
    });
  }
  // else if there is a city name we have to fetech data from weather api
  fetchData(req.query.search, (error, response) => {
    if (error) {
      res.send({ Error: error.message });
    } else {
      res.send({ temperature: response });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page Not Found ",
    message: "Pls try with a valid path",
  });
});
