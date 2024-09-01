<p align="center">
  <img src="https://github.com/user-attachments/assets/726763a6-094a-42cf-878c-1e7d47a2e597" style="height: 250px"/>
</p>




# 🎧 Spotify React Web Client

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

> [!IMPORTANT]  
> Spotify Playback requires users to authenticate with a valid Spotify Premium subscription.


## 🚀 Features

⚡ **Music Playback**: Play songs in real-time using the Spotify Playback SDK.

⚡ **Playback Controls**: Play, pause, next, previous, shuffle, and repeat functionalities.

⚡ **Music Browsing**: Search and explore songs, artists, albums, and playlists.

⚡ **Playlists Management**: Create, edit, and delete personalized playlists.

⚡ **Saved Playlists and Albums Access**: View and play your saved playlists and albums.

⚡ **Liked Songs**: Mark tracks as "liked" and access a dedicated playlist for liked songs.

⚡ **Playback Devices**: Switch between different playback devices (desktop, mobile, smart speakers).

⚡ **Follow/Unfollow Artists**: Follow and unfollow artists to get updates on their new releases.

⚡ **Artist and Album Pages**: Dedicated pages for artists and albums, showcasing top songs, discography, and related artists.

## 🛠 Technologies Used

🎵 React: For building the user interface with reusable components.

🎵 React Redux: For global state management and smooth data flow across the app.

🎵 <a href="https://developer.spotify.com/documentation/web-api/">Spotify Web API</a>: To fetch data like playlists, albums, and user information.

🎵 <a href="https://developer.spotify.com/documentation/web-playback-sdk/">Spotify Playback SDK</a>: For real-time music playback control within the web client.


## 📸 Screenshots

More in images folder.

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

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

1. Clone this repository:

   ```bash
   clone https://github.com/francoborrelli/spotify-react-web-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spotify-react-web-client
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Set up your Spotify Developer account and create a [new app](https://developer.spotify.com/dashboard/applications) to obtain your **Client ID** and **Redirect URI**. Add these to an `.env` file in the root of your project:

   ```
   REACT_APP_SPOTIFY_CLIENT_ID=your-client-id
   REACT_APP_REDIRECT_URI=http://localhost:3000/callback
   ```

5. Start the development server:

   ```bash
   yarn start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## 🌐 2018 Version

There is also a 2018 version of this Spotify clone, which features the Spotify UI from that year. You can find the code for that version in the [`main-2018`](https://github.com/francoborrelli/spotify-react-web-client/tree/main-2018) branch.

- **2018 version branch**: [main-2018](https://github.com/francoborrelli/spotify-react-web-client/tree/main-2018)
- **2018 live demo**: [Check out the app](https://spotify-react-web-client-2018.onrender.com/)

Feel free to explore the older version and compare the features and functionality between the two versions.

## 🤝 Contributions

Contributions are welcome! If you have any suggestions or improvements, feel free to fork the repository, create a new branch, and submit a pull request.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.





