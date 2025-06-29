const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');

// POST /api/playlists -> Créer une playlist
router.post('/', async (req, res) => {
  try {
    console.log('Données reçues :', req.body); // 👈 AJOUT ICI

    const { name, owner } = req.body;

    const playlist = new Playlist({
      name,
      owner: new mongoose.Types.ObjectId(owner)
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    console.error('Erreur création playlist :', error);
    res.status(400).json({
      message: 'Erreur lors de la création de la playlist',
      error: error.message
    });
  }
});


// GET /api/playlists -> Récupérer toutes les playlists
router.get('/', async (req, res) => {
    try {
        const filter = req.query.owner ? { owner: req.query.owner } : {};
        const list = await Playlist.find(filter).populate('songs').populate('songs');
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des playlists' });
    }
});

// PUT /api/playlists/:id -> Ajouter une chanson à une playlist
router.put('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist non trouvée' });

    const songId = req.body.songId;
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la chanson à la playlist' });
  }
});


// DELETE /api/playlists/:id
router.delete('/:id', async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;