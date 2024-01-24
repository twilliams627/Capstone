const express = require('express');
const { sequelize } = require('../../db/connection');

const router = express.Router();

// Route to get all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await sequelize.query('SELECT * FROM Playlists', { type: sequelize.QueryTypes.SELECT });
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific playlist by ID
router.get('/:id', async (req, res) => {
  const playlistId = req.params.id;
  try {
    const [playlist] = await sequelize.query('SELECT * FROM Playlists WHERE id = :id', {
      replacements: { id: playlistId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!playlist) {
      res.status(404).json({ error: 'Playlist not found' });
    } else {
      res.json(playlist);
    }
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new playlist
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    // Sequelize query to create a new playlist
    const newPlaylist = await sequelize.query('INSERT INTO Playlists (name) VALUES (:name) RETURNING name', {
      replacements: { name },
      type: sequelize.QueryTypes.INSERT,
    });
    const allPlaylists = await sequelize.query("SELECT name FROM Playlists");
    res.json(allPlaylists[0]);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a playlist by ID
router.delete('/:id', async (req, res) => {
  const playlistId = req.params.id;

  try {
    const deletedPlaylistCount = await sequelize.query('DELETE FROM Playlists WHERE id = :id', {
      replacements: { id: playlistId },
      type: sequelize.QueryTypes.DELETE,
    });

    if (deletedPlaylistCount === 0) {
      res.status(404).json({ error: 'Playlist not found' });
    } else {
      res.json({ message: 'Playlist deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
