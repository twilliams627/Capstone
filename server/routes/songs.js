const express = require('express');
const { sequelize } = require('../../db/connection');

const router = express.Router();

// Route to get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await sequelize.query('SELECT * FROM Songs', { type: sequelize.QueryTypes.SELECT });
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new song
router.post('/', async (req, res) => {
  const { title, artist } = req.body;

  try {
    const [songResult] = await sequelize.query('INSERT INTO Songs (title, artist) VALUES (:title, :artist) RETURNING *', {
      replacements: { title, artist },
      type: sequelize.QueryTypes.INSERT,
    });

//Using Sequelize query to get titles and artists
const songData = await sequelize.query('SELECT title, artist FROM Songs', {
  type: Sequelize.QueryTypes.SELECT,
  });
  
  //Return the result as JSON
  res.json(songsData);
  
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a song by ID
router.put('/:id', async (req, res) => {
  const songId = req.params.id;
  const { title, artist } = req.body;

  try {
    const [updatedSong] = await sequelize.query(
      'UPDATE Songs SET title = :title, artist = :artist WHERE id = :id RETURNING *',
      {
        replacements: { id: songId, title, artist },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (!updatedSong) {
      res.status(404).json({ error: 'Song not found' });
    } else {
      res.json(updatedSong[0]);
    }
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a song by ID
router.delete('/:id', async (req, res) => {
  const songId = req.params.id;

  try {
    const deletedSongCount = await sequelize.query('DELETE FROM Songs WHERE id = :id', {
      replacements: { id: songId },
      type: sequelize.QueryTypes.DELETE,
    });

    if (deletedSongCount === 0) {
      res.status(404).json({ error: 'Song not found' });
    } else {
      res.json({ message: 'Song deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;



