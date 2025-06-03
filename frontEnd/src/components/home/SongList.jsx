import {useEffect,useState} from 'react'
import axios from 'axios'
import SongItem from '../SongItem.jsx' // import songitem component
import MusicPlayer from '../MusicPlayer.jsx' // import musicplayer component
import apiUrl from '../../api.jsx' // import api url from centralized file

function SongList(){
    // state to hold songs data
    const [songs,setSongs]=useState([])
    // state to hold the currently selected song
    const [currentSong,setCurrentSong]=useState(null)
    // state to hold the index of the current song
    const [currentIndex,setCurrentIndex]=useState(null)

    // effect hook to fetch songs data from server
    useEffect(() => {
        const fetchSongs=async () => {
            try{
                const response=await axios.get(`${apiUrl}/songs`) // make http get request
                setSongs(response.data) // update songs state with response data
            } 
            catch(err){
                console.error('failed to fetch songs',err) // log error if request fails
            }
        }

        fetchSongs() // call the fetch function
    },[]) // empty dependency array means this effect runs once after initial render

    // function to handle selecting a song
    const handleSongSelect=(song,index) => {
        setCurrentSong(song) // update current song state
        setCurrentIndex(index) // update current index state
    }

    // function to handle skipping songs
    const handleSkip=(direction) => {
        if(direction === 'start'){
            // previous song
            if(currentIndex > 0){
                setCurrentIndex(currentIndex - 1) // decrement index
                setCurrentSong(songs[currentIndex - 1]) // set previous song as current
            }
        } 
        else if(direction === 'end'){
            // next song
            if(currentIndex < songs.length - 1){
                setCurrentIndex(currentIndex + 1) // increment index
                setCurrentSong(songs[currentIndex + 1]) // set next song as current
            }
        }
    }

    return(
        <div>
            <div id='pop_song'>
                {/* map through songs array to render songitem components */}
                {songs.map((song,index) => (
                    <SongItem
                        key={index}
                        imgSrc={song.imgSrc} // pass image source to songitem
                        title={song.title} // pass title to songitem
                        subtitle={song.subtitle} // pass subtitle to songitem
                        src={song.src} // pass audio source to songitem
                        onSelect={() => handleSongSelect(song,index)} // pass selection handler to songitem
                    />
                ))}
            </div>
            <div id='main_for_play_side'>
                {/* render musicplayer component with current song and skip handler */}
                <MusicPlayer song={currentSong} onSkip={handleSkip}/>
            </div>
        </div>
    )
}

export default SongList
