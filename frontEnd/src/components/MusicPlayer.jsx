import React, { useState, useRef, useEffect } from "react";
import onMyWay from "/assets/on_my_way.jpg";
import defaultSong from "/audio/On My Way.mp3"; // IMPORT THE DEFAULT SONG

function MusicPlayer({ song, onSkip }) {
    // STATE HOOKS
    const [isPlaying, setIsPlaying] = useState(false); // TRACKS WHETHER THE SONG IS PLAYING
    const [currentTime, setCurrentTime] = useState(0); // CURRENT PLAYBACK TIME
    const [duration, setDuration] = useState(0); // DURATION OF THE CURRENT SONG
    const [volume, setVolume] = useState(80); // CURRENT VOLUME LEVEL (0-100)
    const [progress, setProgress] = useState(0); // TRACKS THE PROGRESS OF THE SONG AS A PERCENTAGE
    const audioRef = useRef(null); // REFERENCE TO THE AUDIO ELEMENT
    const progressRef = useRef(null); // REFERENCE TO THE PROGRESS BAR INPUT

    // UPDATE VOLUME WHEN IT CHANGES
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100; // SET THE VOLUME OF THE AUDIO ELEMENT
        }
    }, [volume]); // DEPENDENCY ARRAY: RUNS WHEN THE VOLUME STATE CHANGES

    // UPDATE CURRENT TIME AND DURATION
    useEffect(() => {
        // FUNCTION TO UPDATE TIME AND PROGRESS
        const updateTime = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime); // UPDATE CURRENT TIME
                setDuration(audioRef.current.duration); // UPDATE DURATION
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100); // UPDATE PROGRESS BAR
            }
        };

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("timeupdate", updateTime); // LISTEN FOR TIMEUPDATES
            return () => {
                audioElement.removeEventListener("timeupdate", updateTime); // CLEANUP LISTENER ON UNMOUNT
            };
        }
    }, [song]); // DEPENDENCY ARRAY: RUNS WHEN THE SONG CHANGES

    // HANDLE SONG CHANGE: LOAD NEW SONG OR DEFAULT SONG
    useEffect(() => {
        if (audioRef.current) {
            // RESET PROGRESS AND CURRENT TIME WHEN A NEW SONG IS LOADED
            setProgress(0);
            setCurrentTime(0);
            if (song) {
                // LOAD SPECIFIC SONG
                audioRef.current.src = song.src; // SET THE SOURCE OF THE AUDIO ELEMENT
                audioRef.current.play().then(() => {
                    setIsPlaying(true); // SET TO PLAYING IF SUCCESSFUL
                }).catch(error => {
                    console.error("Error playing the song:", error); // LOG ERROR IF PLAYBACK FAILS
                });
            } else {
                // LOAD DEFAULT SONG IF NO SPECIFIC SONG IS PROVIDED
                audioRef.current.src = defaultSong; // SET THE SOURCE TO THE DEFAULT SONG
                setIsPlaying(false); // SET TO PAUSED
            }
        }
    }, [song]); // DEPENDENCY ARRAY: RUNS WHEN THE SONG CHANGES

    // HANDLE PLAY/PAUSE TOGGLE
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause(); // PAUSE THE SONG
                setIsPlaying(false); // UPDATE STATE TO REFLECT PAUSED
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true); // PLAY THE SONG AND UPDATE STATE
                }).catch(error => {
                    console.error("Error playing the song:", error); // LOG ERROR IF PLAYBACK FAILS
                });
            }
        }
    };

    // HANDLE SKIPPING TO ANOTHER SONG
    const handleSkip = (direction) => {
        if (onSkip) {
            onSkip(direction); // CALL THE onSkip FUNCTION WITH DIRECTION
        }
    };

    // HANDLE SEEKING WITHIN THE CURRENT SONG
    const handleSeek = (e) => {
        const newValue = e.target.value; // GET NEW SEEK POSITION FROM INPUT RANGE
        if (audioRef.current) {
            audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration; // UPDATE AUDIO CURRENT TIME
            setProgress(newValue); // UPDATE PROGRESS BAR POSITION
        }
    };

    // HANDLE VOLUME CHANGE
    const handleVolumeChange = (e) => {
        setVolume(e.target.value); // UPDATE VOLUME STATE BASED ON INPUT VALUE
    };

    // FORMAT TIME IN MINUTES AND SECONDS
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60); // CALCULATE MINUTES
        const sec = Math.floor(seconds % 60).toString().padStart(2, "0"); // CALCULATE SECONDS AND FORMAT
        return `${min}:${sec}`; // RETURN TIME IN MM:SS FORMAT
    };

    return (
        <div id="playSide">  
            {/* WAVE ANIMATION */}
            <div className="wave">
                <div className="wave1"></div>
                <div className="wave1"></div>
                <div className="wave1"></div>
            </div>

            {/* DISPLAY CURRENT SONG IMAGE OR DEFAULT IMAGE */}
            <img src={song ? song.imgSrc : onMyWay} alt={song ? song.title : "Default"} />
            {/* PLAY/PAUSE AND SKIP ICONS */}
            <div className="icon">
                <i className="bi bi-skip-start-fill" onClick={() => handleSkip("start")}></i>
                <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`} onClick={handlePlayPause}></i>
                <i className="bi bi-skip-end-fill" onClick={() => handleSkip("end")}></i>
            </div>

            {/* DISPLAY CURRENT TIME AND DURATION */}
            <span className="currentStart">{formatTime(currentTime)}</span>

            {/* SONG PROGRESS BAR */}
            <div className="bar">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek} // HANDLE SEEKING
                    ref={progressRef} // REFERENCE TO THE INPUT ELEMENT
                />
                <div className="bar2" style={{ width: `${progress}%` }}></div> {/* PROGRESS BAR */}
                <div className="dot" style={{ left: `${progress}%` }}></div> {/* SEEK DOT */}
            </div>
            
            {/* DISPLAY REMAINING TIME */}
            <span className="currentEnd">{formatTime(duration - currentTime)}</span>

            {/* VOLUME CONTROL */}
            <div className="vol">
                <i className="bi bi-volume-up-fill" id="vol_icon"></i>
                <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} /> {/* VOLUME INPUT */}
                <div className="vol_bar" style={{ width: `${volume}%` }}></div> {/* VOLUME BAR */}
                <div className="dot" style={{ left: `${volume}%` }}></div> {/* VOLUME DOT */}
            </div>

            {/* AUDIO ELEMENT */}
            <audio
                ref={audioRef} // REFERENCE TO THE AUDIO ELEMENT
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        setDuration(audioRef.current.duration); // UPDATE DURATION WHEN METADATA IS LOADED
                    }
                }}
            />
        </div>
    );
}

export default MusicPlayer;
