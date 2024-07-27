import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItem from "../SongItem";
import MusicPlayer from "../MusicPlayer";

function SongList2({ newSong }) {
    // **_State to hold the list of songs._**
    const [songs, setSongs] = useState([]);
    // **_State to hold the currently selected song._**
    const [currentSong, setCurrentSong] = useState(null);
    // **_State to hold the index of the currently selected song._**
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        // **_Function to fetch songs from the server._**
        const fetchSongs = async () => {
            try {
                // **_Make a GET request to fetch songs._**
                const response = await axios.get("http://localhost:5000/my_songs");
                // **_Update state with fetched songs._**
                setSongs(response.data);
            } catch (err) {
                // **_Handle any errors that occur during the fetch._**
                console.error("Failed to fetch songs", err);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        if (newSong) {
            // **_Log new song addition for debugging._**
            console.log('Adding new song to list:', newSong);
            // **_Add new song to the existing list of songs._**
            setSongs((prevSongs) => [...prevSongs, newSong]);
        }
    }, [newSong]);

    // **_Handler function to update the current song and its index._**
    const handleSongSelect = (song, index) => {
        setCurrentSong(song);
        setCurrentIndex(index);
    };

    // **_Handler function to skip to the previous or next song._**
    const handleSkip = (direction) => {
        if (direction === 'start') {
            if (currentIndex > 0) {
                // **_Skip to the previous song._**
                setCurrentIndex(currentIndex - 1);
                setCurrentSong(songs[currentIndex - 1]);
            }
        } else if (direction === 'end') {
            if (currentIndex < songs.length - 1) {
                // **_Skip to the next song._**
                setCurrentIndex(currentIndex + 1);
                setCurrentSong(songs[currentIndex + 1]);
            }
        }
    };

    return (
        <div>
            {/* **_Container for the list of songs._** */}
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
         
            {/* **_Container for the music player._** */}
            <div id="main_for_play_side">
                <MusicPlayer song={currentSong} onSkip={handleSkip} />
            </div>
        
        </div>
    );
}

export default SongList2;
