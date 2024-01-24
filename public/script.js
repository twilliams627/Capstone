function createPlaylist() {
  const playlistDropdown = document.getElementById('playlist');
  const newPlaylistInput = document.getElementById('newPlaylistName');

  const playlistName = newPlaylistInput.value;
  console.log("createPlaylist");

  axios.post("http://localhost:3000/playlists", { name: playlistName })
    .then(response => {
      const dataArray = response.data;
      console.log (response.data)
      // Creating HTML content
      let htmlContent = '';
      for (let i = 0; i < dataArray.length; i++) {
        htmlContent += '<p>' + dataArray[i].name + '</p>';
      }
      console.log (htmlContent)
      // Selecting the div with playlist-container class
      const playlistContainer = document.querySelector('.playlist-container');
      
      // Setting innerHTML to htmlContent
      playlistContainer.innerHTML = htmlContent;
    });
}

function addSong() {
  const songTitle = document.getElementById('songTitle').value;
  const art = document.getElementById('artist').value;

  axios.post("http://localhost:3000/songs", {title: songTitle, artist: art})
  .then(response => {
    const dataArray = response.data;
    console.log (response.data)
    // Creating HTML content
    let htmlContent = '';
    for (let i = 0; i < dataArray.length; i++) {
      htmlContent += '<p>' + dataArray[i].title + ' - ' + dataArray[i].artist + '</p>';
    }
    console.log (htmlContent)
    // Selecting the div where you want to display songs
    const songContainer = document.querySelector('.song-container');
      
    // Setting innerHTML to htmlContent
    songContainer.innerHTML = htmlContent;
  });
}

// Additional event listeners
const createPlaylistsButton = document.getElementById('createPlaylist');
createPlaylistsButton.addEventListener('click', createPlaylist);
