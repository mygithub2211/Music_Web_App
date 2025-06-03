import {useEffect,useState} from 'react'
import axios from 'axios'
import SongItem from '../SongItem.jsx'
import MusicPlayer from '../MusicPlayer.jsx'
import apiUrl from '../../api.jsx' // import the api url

function SongList2({newSong}){
    // state to hold the list of songs.
    const [songs,setSongs]=useState([])
    // state to hold the currently selected song.
    const [currentSong,setCurrentSong]=useState(null)
    // state to hold the index of the currently selected song.
    const [currentIndex,setCurrentIndex]=useState(null)

    useEffect(()=>{
        // function to fetch songs from the server.
        const fetchSongs=async()=>{
            try{
                // make a get request to fetch songs.
                const response=await axios.get(`${apiUrl}/my_songs`)
                // update state with fetched songs.
                setSongs(response.data)
            } 
            catch(err){
                // handle any errors that occur during the fetch.
                console.error('failed to fetch songs',err)
            }
        }

        fetchSongs()
    },[])

    useEffect(()=>{
        if(newSong){
            // log new song addition for debugging.
            console.log('adding new song to list:',newSong)
            // add new song to the existing list of songs.
            setSongs((prevSongs) => [...prevSongs,newSong])
        }
    },[newSong])

    // handler function to update the current song and its index.
    const handleSongSelect=(song,index)=>{
        setCurrentSong(song)
        setCurrentIndex(index)
    }

    // handler function to skip to the previous or next song.
    const handleSkip=(direction)=>{
        if(direction === 'start'){
            if(currentIndex > 0){
                // skip to the previous song.
                setCurrentIndex(currentIndex - 1)
                setCurrentSong(songs[currentIndex - 1])
            }
        } else if(direction === 'end'){
            if(currentIndex < songs.length - 1){
                // skip to the next song.
                setCurrentIndex(currentIndex + 1)
                setCurrentSong(songs[currentIndex + 1])
            }
        }
    }

    return(
        <div>
            {/* container for the list of songs. */}
            <div id='pop_song2'>
                {songs.map((song,index)=>(
                    <SongItem
                        key={index}
                        imgSrc={song.imgSrc}
                        title={song.title}
                        subtitle={song.subtitle}
                        src={song.src}
                        onSelect={() => handleSongSelect(song,index)}
                    />
                ))}
            </div>
         
            {/* container for the music player. */}
            <div id='main_for_play_side'>
                <MusicPlayer song={currentSong} onSkip={handleSkip}/>
            </div>
        
        </div>
    )
}

export default SongList2
