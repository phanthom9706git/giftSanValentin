 // Array con los IDs de las canciones (estas deben ser las canciones de tu lista de Spotify)
//  const songs = [
//     {
//         fecha: "Canción 1",
//         spotifyID: "071uK6V3dKj3BMNNzTEyRu"
//     },
//     {
//         fecha: "Canción 2",
//         spotifyID: "ID_CANCION_2"
//     },
//     {
//         fecha: "Canción 3",
//         spotifyID: "ID_CANCION_3"
//     },
//     {
//         fecha: "Canción 1",
//         spotifyID: "ID_CANCION_1"
//     },
//     {
//         fecha: "Canción 2",
//         spotifyID: "ID_CANCION_2"
//     },
//     {
//         fecha: "Canción 3",
//         spotifyID: "ID_CANCION_3"
//     }
//     // Puedes agregar más canciones al array...
// ];

// // Función para crear las tarjetas
// function createSongCard(song) {
//     return `
//         <div class="cardSong">
//             <div class="card bg-secondary text-light">
//                 <div class="card-body text-center">                   
//                     <iframe style="border-radius:12px" 
//                         src="https://open.spotify.com/embed/track/${song.spotifyID}?utm_source=generator" 
//                         width="100%" height="80" frameBorder="0" 
//                         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
//                         loading="lazy">
//                     </iframe>
//                     <p class="card-title">${song.fecha}</p>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// // Función para renderizar todas las canciones
// function renderSongs() {
//     const songListContainer = document.getElementById('song-list');
//     songListContainer.innerHTML = songs.map(createSongCard).join('');
// }

// // Llamada a la función para cargar las canciones
// renderSongs();
document.getElementsByName('volverBtn').forEach(elemento => {
    elemento.addEventListener('click', function() {
    window.location.href = "/boardInicio/index.html"; // Cambia por la URL que desees
    })
});