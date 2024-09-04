const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// middleware to check working hours

let workingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 21) {
    next();
  } else {
    res
      .status(403)
      .send(
        "This web application working from the hours of 9am to 5pm on Weekdays"
      );
  }
};

app.use(workingHours);

// Templates engines

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/service", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log(`Currently running on http://localhost:${port}`);
});
