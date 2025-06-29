const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users -> inscription d'un nouvel utilisateur
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ id: user._id, username: user.username, email: user.email });
    }catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
    }
});

// GET /api/users/:id -> Récupérer un utilisateur par son ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password').populate('favoriteSongs', 'title artist').populate('playlists', 'name');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
});

// GET /api/users/:id/favorites/:songId -> Récupérer tous les utilisateurs
router.get('/:id/favorites/:songId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const idx = user.favoriteSongs.indexOf(req.params.songId);
        if (idx === -1) user.favoriteSongs.push(req.params.songId);
        else user.favoriteSongs.splice(idx, 1);
        await user.save();
        res.json(user.favoriteSongs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des favoris de l\'utilisateur' });
    }
});

module.exports = router;