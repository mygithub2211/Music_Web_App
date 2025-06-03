import {useEffect} from 'react'

function PopularSongHeading2(){
    useEffect(() => {
        const popSong=document.getElementById('pop_song2') // select the pop_song element
        const leftArrow=document.getElementById('pop_song_left2')
        const rightArrow=document.getElementById('pop_song_right2')

        // scroll functionality
        leftArrow.addEventListener('click',() => {
            popSong.scrollLeft -= 200
        })
       
        rightArrow.addEventListener('click',() => {
            popSong.scrollLeft += 200
        })
    },[])

    return(
        <div id='popular_song_heading2'>
            <h1>My Songs</h1>
            <div className='btn_s'>
                <i className='bi bi-arrow-left-short' id='pop_song_left2'></i>
                <i className='bi bi-arrow-right-short' id='pop_song_right2'></i>
            </div>
        </div>
    )
}

export default PopularSongHeading2
