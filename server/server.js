// server/server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
// const playlistsRoutes = require("./routes/playlists"); // à ajouter si tu crées la route

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// Routes API
app.use("/api/auth", authRoutes);
// app.use("/api/playlists", playlistsRoutes);

// Servir le frontend React (PWA)
app.use(express.static(path.join(__dirname, "../client/build")));

// Route pour toutes les autres requêtes → index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Optionnel : route test
app.get("/test", (req, res) => {
  res.send("Backend IPTV Premium fonctionne !");
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
