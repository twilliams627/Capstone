const { sequelize } = require('./db/connection');

// Define schema for playlists table
const playlistsSchema = `
  CREATE TABLE IF NOT EXISTS Playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL
  );
`;

// Define schema for songs table
const songsSchema = `
  CREATE TABLE IF NOT EXISTS Songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL
  );
`;

// Execute queries to create tables
sequelize.query(playlistsSchema)
  .then(() => {
    console.log('Playlists table created successfully');
  })
  .catch((error) => {
    console.error('Error creating Playlists table:', error);
  });

sequelize.query(songsSchema)
  .then(() => {
    console.log('Songs table created successfully');
  })
  .catch((error) => {
    console.error('Error creating Songs table:', error);
  });
