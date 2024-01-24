const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

// Define Playlist and Song queries here
const Playlist = {
  findAll: async () => {
    return sequelize.query('SELECT * FROM Playlists', { type: sequelize.QueryTypes.SELECT });
  },
  // Add other Playlist queries if needed
};

const Song = {
  findAll: async () => {
    return sequelize.query('SELECT * FROM Songs', { type: sequelize.QueryTypes.SELECT });
  },
  // Add other Song queries if needed
};

module.exports = {
  sequelize,
  Sequelize,
  Playlist,
  Song,
};
