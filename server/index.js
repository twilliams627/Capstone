require('dotenv').config();
const express = require('express');
const playlistsRouter = require('./routes/playlists');
const songsRouter = require('./routes/songs');
const { sequelize } = require('../db/connection');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Songbird Playlist Manager');
});

// Routes for Playlists
app.use('/playlists', playlistsRouter);

// Routes for Songs
app.use('/songs', songsRouter);

// Seeding route
app.post('/seed', async (req, res) => {
  try {
    // Add your seeding logic here
    // ...

    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Internal Server Error');
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
