const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// GET /api/songs -> Récupérer toutes les chansons
router.get('/', async (req, res) => {
    try {
        const filter = req.query.q 
      ? { title: new RegExp(req.query.q, 'i') } 
      : {};
    const songs = await Song.find(filter);
    res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des chansons' });
    }
    });

    // POST /api/songs -> Ajouter une nouvelle chanson
    router.post('/', async (req, res) => {
        try
        {
            const song = new Song(req.body);
            await song.save();
            res.status(201).json(song);
        }catch (error) {
            res.status(400).json({ message: 'Erreur lors de l\'ajout de la chanson' });
        }
    });

    // PUT /api/songs/:id
router.put('/:id', async (req, res) => {
  try {
    const s = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/songs/:id
router.delete('/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


    module.exports = router;