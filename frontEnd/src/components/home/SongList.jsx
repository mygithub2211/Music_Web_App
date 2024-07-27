import SongItem from "../SongItem"; // IMPORT SongItem COMPONENT
import MusicPlayer from "../MusicPlayer"; // IMPORT MusicPlayer COMPONENT
import axios from "axios"; // IMPORT AXIOS FOR HTTP REQUESTS
import React, { useEffect, useState } from "react"; // IMPORT REACT AND HOOKS

function SongList() {
    // STATE TO HOLD SONGS DATA
    const [songs, setSongs] = useState([]);
    // STATE TO HOLD THE CURRENTLY SELECTED SONG
    const [currentSong, setCurrentSong] = useState(null);
    // STATE TO HOLD THE INDEX OF THE CURRENT SONG
    const [currentIndex, setCurrentIndex] = useState(null);

    // EFFECT HOOK TO FETCH SONGS DATA FROM SERVER
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/songs"); // MAKE HTTP GET REQUEST
                setSongs(response.data); // UPDATE SONGS STATE WITH RESPONSE DATA
            } catch (err) {
                console.error("Failed to fetch songs", err); // LOG ERROR IF REQUEST FAILS
            }
        };

        fetchSongs(); // CALL THE FETCH FUNCTION
    }, []); // EMPTY DEPENDENCY ARRAY MEANS THIS EFFECT RUNS ONCE AFTER INITIAL RENDER

    // FUNCTION TO HANDLE SELECTING A SONG
    const handleSongSelect = (song, index) => {
        setCurrentSong(song); // UPDATE CURRENT SONG STATE
        setCurrentIndex(index); // UPDATE CURRENT INDEX STATE
    };

    // FUNCTION TO HANDLE SKIPPING SONGS
    const handleSkip = (direction) => {
        if (direction === 'start') {
            // PREVIOUS SONG
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1); // DECREMENT INDEX
                setCurrentSong(songs[currentIndex - 1]); // SET PREVIOUS SONG AS CURRENT
            }
        } else if (direction === 'end') {
            // NEXT SONG
            if (currentIndex < songs.length - 1) {
                setCurrentIndex(currentIndex + 1); // INCREMENT INDEX
                setCurrentSong(songs[currentIndex + 1]); // SET NEXT SONG AS CURRENT
            }
        }
    };

    return (
        <div>
            <div id="pop_song">
                {/* MAP THROUGH SONGS ARRAY TO RENDER SongItem COMPONENTS */}
                {songs.map((song, index) => (
                    <SongItem
                        key={index}
                        imgSrc={song.imgSrc} // PASS IMAGE SOURCE TO SongItem
                        title={song.title} // PASS TITLE TO SongItem
                        subtitle={song.subtitle} // PASS SUBTITLE TO SongItem
                        src={song.src} // PASS AUDIO SOURCE TO SongItem
                        onSelect={() => handleSongSelect(song, index)} // PASS SELECTION HANDLER TO SongItem
                    />
                ))}
                
            </div>
            <div id="main_for_play_side">
                    {/* RENDER MusicPlayer COMPONENT WITH CURRENT SONG AND SKIP HANDLER */}
                    <MusicPlayer song={currentSong} onSkip={handleSkip} />
                </div>
        
            
            
        </div>
    );
}

export default SongList;
