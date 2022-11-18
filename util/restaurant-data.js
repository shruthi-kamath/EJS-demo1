function getStoredRestaurants () {
  const filPath = path.join(__dirname, "data", "restaurants.json");

  const filData = fs.readFileSync(filPath);
  const storedRestaurants = JSON.parse(filData);

  return storedRestaurants;
}