const express = require("express");
const cors = require("cors");
const db = require("./db/index.js");
require("dotenv").config();
const morgan = require("morgan");

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors is used to allow cross-origin requests
app.use(cors());

// GET all restaurants
app.get("/api/v1/restaurants/", async (req, res) => {
  const result = await db.query("SELECT * FROM restaurants");
  const restaurantRatingsData = await db.query(
    "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
  );

  console.log(result.rows);
  console.log(restaurantRatingsData.rows);
  res.status(200).json({
    status: "success",
    results: restaurantRatingsData.rows.length,
    data: {
      restaurants: restaurantRatingsData.rows,
    },
  });
});

// GET one restaurant and its reviews
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE restaurants.id=($1)",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id=($1)",
      [req.params.id]
    );

    res.status(200).json({
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// POST restaurant coming from form
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results.rows);
    res.status(200).json({
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const results = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params);
  try {
    await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// POST review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO reviews (name,rating,review,restaurant_id) VALUES ($1,$2,$3,$4) returning *",
      [req.body.name, req.body.rating, req.body.review, req.params.id]
    );
    res.status(200).json({
      data: {
        review: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
