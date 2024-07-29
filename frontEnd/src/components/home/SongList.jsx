import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItem from "../SongItem"; // Import SongItem component
import MusicPlayer from "../MusicPlayer"; // Import MusicPlayer component
import apiUrl from "../api"; // Import API URL from centralized file

function SongList() {
    // State to hold songs data
    const [songs, setSongs] = useState([]);
    // State to hold the currently selected song
    const [currentSong, setCurrentSong] = useState(null);
    // State to hold the index of the current song
    const [currentIndex, setCurrentIndex] = useState(null);

    // Effect hook to fetch songs data from server
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`${apiUrl}/songs`); // Make HTTP GET request
                setSongs(response.data); // Update songs state with response data
            } catch (err) {
                console.error("Failed to fetch songs", err); // Log error if request fails
            }
        };

        fetchSongs(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once after initial render

    // Function to handle selecting a song
    const handleSongSelect = (song, index) => {
        setCurrentSong(song); // Update current song state
        setCurrentIndex(index); // Update current index state
    };

    // Function to handle skipping songs
    const handleSkip = (direction) => {
        if (direction === "start") {
            // Previous song
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1); // Decrement index
                setCurrentSong(songs[currentIndex - 1]); // Set previous song as current
            }
        } else if (direction === "end") {
            // Next song
            if (currentIndex < songs.length - 1) {
                setCurrentIndex(currentIndex + 1); // Increment index
                setCurrentSong(songs[currentIndex + 1]); // Set next song as current
            }
        }
    };

    return (
        <div>
            <div id="pop_song">
                {/* Map through songs array to render SongItem components */}
                {songs.map((song, index) => (
                    <SongItem
                        key={index}
                        imgSrc={song.imgSrc} // Pass image source to SongItem
                        title={song.title} // Pass title to SongItem
                        subtitle={song.subtitle} // Pass subtitle to SongItem
                        src={song.src} // Pass audio source to SongItem
                        onSelect={() => handleSongSelect(song, index)} // Pass selection handler to SongItem
                    />
                ))}
            </div>
            <div id="main_for_play_side">
                {/* Render MusicPlayer component with current song and skip handler */}
                <MusicPlayer song={currentSong} onSkip={handleSkip} />
            </div>
        </div>
    );
}

export default SongList;
