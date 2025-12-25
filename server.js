// app.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Configure session middleware
app.use(
  session({
    secret: "christmas_wish_secret_key_2023",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Password configuration
const PASSWORD = "KamsiFaith2025"; // Change this to your desired password

// Routes
app.get("/", (req, res) => {
  if (req.session.authenticated) {
    res.render("christmas", { name: "Kamsi Faith" });
  } else {
    res.render("login", { error: null });
  }
});

app.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === PASSWORD) {
    req.session.authenticated = true;
    res.redirect("/");
  } else {
    res.render("login", {
      error: "Incorrect password. Please try again.",
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access your Christmas wish at: http://localhost:${PORT}`);
  console.log(`Password: ${PASSWORD}`);
});

