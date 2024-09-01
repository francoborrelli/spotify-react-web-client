<p align="center">
  <img src="https://github.com/francoborrelli/spotify-react-web-client/assets/17908233/ad91d92d-200f-4a3e-8171-2b299cc25618" style="height: 250px"/>
</p>



# Spotify React Web Client

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

> [!IMPORTANT]  
> Spotify Playback requires users to authenticate with a valid Spotify Premium subscription.


<p>
  ⚡ Spotify Web Client using <a href="https://developer.spotify.com/documentation/web-api/">Spotify Web API</a> and <a href="https://developer.spotify.com/documentation/web-playback-sdk/">Spotify Playback SDK</a>. 
</p>

<p>
  ⚡ This project was bootstrapped with <a href="https://github.com/facebookincubator/create-react-app">Create React App<a/>.
</p>


## 🎹 Features

🎵 Play full audio tracks.

🎵 Control playback (pause, volume, shuffle, etc).

🎵 Add or edit your playlists.

🎵 See your recently played tracks and your top artists.

🎵 Follow and unfollow playlists and artists.

🎵 Add or remove tracks from playlists and your library.

🎵 Change the device in which you are currently playing.

🎵 Search tracks, albums, artists and playlists.

## 🖥️ Screenshots


<div align="center">
    <table >
     <tr>
       <td>
         <img src="images/Home.png?raw=true 'Playlist'"/>
         <img src="images/CurrentDevices.png?raw=true 'Playlist'"/>
       </td>
        <td>
         <img src="images/playlist.png?raw=true 'Playlist'"/>
          <img src="images/browse.png?raw=true 'Playlist'"/>
       </td>
                 <td>
         <img src="images/Profile.png?raw=true 'Playlist'"/>
          <img src="images/artist.png?raw=true 'Playlist'"/>
       </td>
     </tr>
    </table>
    </div>

More in images folder.

## 👨‍💻 How to Run locally

1️⃣ First you need a [Spotify Client ID](https://developer.spotify.com/dashboard/applications).

```bash
$ git clone https://github.com/francoborrelli/spotify-react-web-client.git
$ cd spotify-react-web-client
$ yarn install
```

2️⃣ You will have to define a `.env` file and set the following variables:

```bash
REACT_APP_CLIENT_ID="YOUR_CLIENT_ID"
REACT_APP_REDIRECT_ID=http://localhost:3000/
```

3️⃣ Now run:

```bash
$ yarn install
$ yarn start
```

and visit http://localhost:3000.

## 🐳 Use Docker!

```bash
docker-compose up -d
```



