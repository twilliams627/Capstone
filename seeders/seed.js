const { Sequelize } = require('sequelize');
const { sequelize } = require('../db/connection');

sequelize.sync({ force: true }).then(async () => {
  try {
    await sequelize.query("DELETE FROM Playlists");
await sequelize.query("DELETE FROM Songs");
    // Create a playlist
    const [playlist] = await sequelize.query('INSERT INTO Playlists (name) VALUES (:name) RETURNING id', {
      replacements: { name: 'My Playlist' },
      type: Sequelize.QueryTypes.INSERT,
    });
    const playlistId = playlist[0]?.id;

    // Create a song
    const [song] = await sequelize.query('INSERT INTO Songs (title, artist) VALUES (:title, :artist) RETURNING id', {
      replacements: { title: 'Song Title', artist: 'Artist Name' },
      type: Sequelize.QueryTypes.INSERT,
    });
    const songId = song[0]?.id;

    // Associate the song with the playlist
    if (playlistId !== undefined && songId !== undefined) {
      await sequelize.query('INSERT INTO PlaylistSongs (playlistId, songId) VALUES (:playlistId, :songId)', {
        replacements: { playlistId, songId },
        type: Sequelize.QueryTypes.INSERT,
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
});
