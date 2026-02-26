const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: String,
  server: String,
  username: String,
  password: String
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  playlists: [PlaylistSchema]
});

module.exports = mongoose.model("User", UserSchema);
