const fs = require("fs");
const path = require("path");
const express = require("express");
const exp = require("constants");
const { response } = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const filPath = path.join(__dirname, "data", "restaurants.json");

  const filData = fs.readFileSync(filPath);
  const storedRestaurants = JSON.parse(filData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filPath = path.join(__dirname, "data", "restaurants.json");

  const filData = fs.readFileSync(filPath);
  const storedRestaurants = JSON.parse(filData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filPath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000);
