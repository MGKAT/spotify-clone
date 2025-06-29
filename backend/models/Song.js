const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: String,
  duration: Number, // en secondes
  audioUrl: String, // URL du fichier audio
  createdEt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Song', songSchema);
