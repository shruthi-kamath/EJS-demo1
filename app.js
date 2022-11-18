const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");

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

app.get("/restaurants/:id", function (req, res) {
  const restaurantID = req.params.id;
  const filPath = path.join(__dirname, "data", "restaurants.json");

  const filData = fs.readFileSync(filPath);
  const storedRestaurants = JSON.parse(filData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantID) {
      return res.render("restaurant-details", { restaurant: restaurant });
    }
  } 

  res.status(404).render("404"); //handelling different ID 404 error
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = getStoredRestaurants();

  restaurants.push(restaurant);

  fs.writeFileSync(filPath, JSON.stringify(restaurants));
  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function(req, res) { //handelling all 404 error
  res.status(404).render("404");
});

app.use(function(error, req, res, next) { //handelling all 500/server side error
  res.status(500).render("500");
});

app.listen(3000);
