import {useState,useRef,useEffect} from 'react'
import onMyWay from '/assets/on_my_way.jpg'
import defaultSong from '/audio/On My Way.mp3' // import the default song

function MusicPlayer({song,onSkip}){
    const [isPlaying,setIsPlaying]=useState(false) // tracks whether the song is playing
    const [currentTime,setCurrentTime]=useState(0) // current playback time
    const [duration,setDuration]=useState(0) // duration of the current song
    const [volume,setVolume]=useState(80) // current volume level (0-100)
    const [progress,setProgress]=useState(0) // tracks the progress of the song as a percentage
    const audioRef=useRef(null) // reference to the audio element
    const progressRef=useRef(null) // reference to the progress bar input

    // update volume when it changes
    useEffect(()=>{
        if(audioRef.current){
            audioRef.current.volume=volume/100 // set the volume of the audio element
        }
    },[volume]) // dependency array: runs when volume state changes

    // update current time and duration
    useEffect(()=>{
        // function to update time and progress
        const updateTime=()=>{
            if(audioRef.current){
                setCurrentTime(audioRef.current.currentTime) // update current time
                setDuration(audioRef.current.duration) // update duration
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100) // update progress bar
            }
        }

        const audioElement=audioRef.current
        if(audioElement){
            audioElement.addEventListener('timeupdate',updateTime) // listen for timeupdate
            return() => {
                audioElement.removeEventListener('timeupdate',updateTime) // cleanup listener on unmount
            }
        }
    },[song]) // dependency array: runs when the song changes

    // handle song change: load new song or default song
    useEffect(()=>{
        if(audioRef.current){
            // reset progress and current time when a new song is loaded
            setProgress(0)
            setCurrentTime(0)
            if(song){
                // load specific song
                audioRef.current.src=song.src // set the source of the audio element
                audioRef.current.play().then(()=>{
                    setIsPlaying(true) // set to playing if successful
                }).catch(error => {
                    console.error('error playing the song:',error) 
                })
            } 
            else{
                // load the default song if no specific song is provided
                audioRef.current.src=defaultSong // set the source to the default song
                setIsPlaying(false) // set to pause
            }
        }
    },[song]) // dependency array: runs when the song changes

    // handle play/pause toggle
    const handlePlayPause=()=>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause() // pause the song
                setIsPlaying(false) // update state to reflect paused
            } 
            else{
                audioRef.current.play().then(() => {
                    setIsPlaying(true) // play the song and update state
                }).catch(error => {
                    console.error('error playing the song:',error) // log error if playback fails
                })
            }
        }
    }

    // handle skipping to another song
    const handleSkip=(direction)=>{
        if(onSkip){
            onSkip(direction) // call the onSkip function with direction
        }
    }

    // handle seeking within the current song
    const handleSeek=(e)=>{
        const newValue=e.target.value // get new seek position from input range
        if(audioRef.current){
            audioRef.current.currentTime=(newValue / 100) * audioRef.current.duration // update audio current time
            setProgress(newValue) // update progress bar position
        }
    }

    // handle volume change
    const handleVolumeChange=(e)=>{
        setVolume(e.target.value) // update volume state based on input value
    }

    // format time in minutes and seconds
    const formatTime=(seconds)=>{
        const min=Math.floor(seconds / 60) // calculate minutes
        const sec=Math.floor(seconds % 60).toString().padStart(2,'0') // calculate seconds and format
        return `${min}:${sec}` // return time in mm:ss format
    }

    return(
        <div id='playSide'>  
            {/* wave animation */}
            <div className='wave'>
                <div className='wave1'></div>
                <div className='wave1'></div>
                <div className='wave1'></div>
            </div>

            {/* display current song image or default image */}
            <img src={song?song.imgSrc:onMyWay} alt={song?song.title:'default'}/>
            {/* play/pause and skip icons */}
            <div className='icon'>
                <i className='bi bi-skip-start-fill' onClick={()=>handleSkip('start')}></i>
                <i className={`bi ${isPlaying?'bi-pause-fill':'bi-play-fill'}`} onClick={handlePlayPause}></i>
                <i className='bi bi-skip-end-fill' onClick={()=>handleSkip('end')}></i>
            </div>

            {/* display current time and duration */}
            <span className='currentStart'>{formatTime(currentTime)}</span>

            {/* song progress bar */}
            <div className='bar'>
                <input
                    type='range'
                    min='0'
                    max='100'
                    value={progress}
                    onChange={handleSeek} // handle seeking
                    ref={progressRef} // reference to the input element
                />
                <div className='bar2' style={{width:`${progress}%`}}></div> {/* progress bar */}
                <div className='dot' style={{left:`${progress}%`}}></div> {/* seek dot */}
            </div>
            
            {/* display remaining time */}
            <span className='currentEnd'>{formatTime(duration-currentTime)}</span>

            {/* volume control */}
            <div className='vol'>
                <i className='bi bi-volume-up-fill' id='vol_icon'></i>
                <input type='range' min='0' max='100' value={volume} onChange={handleVolumeChange}/> {/* volume input */}
                <div className='vol_bar' style={{width:`${volume}%`}}></div> {/* volume bar */}
                <div className='dot' style={{left:`${volume}%`}}></div> {/* volume dot */}
            </div>

            {/* audio element */}
            <audio
                ref={audioRef} // reference to the audio element
                onLoadedMetadata={()=>{
                    if(audioRef.current){
                        setDuration(audioRef.current.duration) // update duration when metadata is loaded
                    }
                }}
            />
        </div>
    )
}

export default MusicPlayer
