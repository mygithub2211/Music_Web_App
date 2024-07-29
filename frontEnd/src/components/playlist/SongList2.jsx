import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItem from "../SongItem";
import MusicPlayer from "../MusicPlayer";
import apiUrl from "../../api"; // Import the API URL

function SongList2({ newSong }) {
    // State to hold the list of songs.
    const [songs, setSongs] = useState([]);
    // State to hold the currently selected song.
    const [currentSong, setCurrentSong] = useState(null);
    // State to hold the index of the currently selected song.
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        // Function to fetch songs from the server.
        const fetchSongs = async () => {
            try {
                // Make a GET request to fetch songs.
                const response = await axios.get(`${apiUrl}/my_songs`);
                // Update state with fetched songs.
                setSongs(response.data);
            } catch (err) {
                // Handle any errors that occur during the fetch.
                console.error("Failed to fetch songs", err);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        if (newSong) {
            // Log new song addition for debugging.
            console.log("Adding new song to list:", newSong);
            // Add new song to the existing list of songs.
            setSongs((prevSongs) => [...prevSongs, newSong]);
        }
    }, [newSong]);

    // Handler function to update the current song and its index.
    const handleSongSelect = (song, index) => {
        setCurrentSong(song);
        setCurrentIndex(index);
    };

    // Handler function to skip to the previous or next song.
    const handleSkip = (direction) => {
        if (direction === "start") {
            if (currentIndex > 0) {
                // Skip to the previous song.
                setCurrentIndex(currentIndex - 1);
                setCurrentSong(songs[currentIndex - 1]);
            }
        } else if (direction === "end") {
            if (currentIndex < songs.length - 1) {
                // Skip to the next song.
                setCurrentIndex(currentIndex + 1);
                setCurrentSong(songs[currentIndex + 1]);
            }
        }
    };

    return (
        <div>
            {/* Container for the list of songs. */}
            <div id="pop_song2">
                {songs.map((song, index) => (
                    <SongItem
                        key={index}
                        imgSrc={song.imgSrc}
                        title={song.title}
                        subtitle={song.subtitle}
                        src={song.src}
                        onSelect={() => handleSongSelect(song, index)}
                    />
                ))}
            </div>
         
            {/* Container for the music player. */}
            <div id="main_for_play_side">
                <MusicPlayer song={currentSong} onSkip={handleSkip} />
            </div>
        
        </div>
    );
}

export default SongList2;
