import {useEffect} from 'react'

function PopularSongHeading(){
    useEffect(() => {
        const popSong=document.getElementById('pop_song') // select the pop_song element
        const leftArrow=document.getElementById('pop_song_left')
        const rightArrow=document.getElementById('pop_song_right')

        // scroll functionality
        leftArrow.addEventListener('click',() => {
            popSong.scrollLeft -=200
        })
       
        rightArrow.addEventListener('click',() => {
            popSong.scrollLeft +=200
        })
    },[])

    return(
        <div id='popular_song_heading'>
            <h1>Popular Songs</h1>
            <div className='btn_s'>
                <i className='bi bi-arrow-left-short' id='pop_song_left'></i>
                <i className='bi bi-arrow-right-short' id='pop_song_right'></i>
            </div>
        </div>
    )
}

export default PopularSongHeading
