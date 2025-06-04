import { useEffect } from 'react'

function PopularSongHeading2() {
  useEffect(() => {
    const popSong = document.getElementById('pop_song2') // select the pop_song element
    const leftArrow = document.getElementById('pop_song_left2') // select the left arrow
    const rightArrow = document.getElementById('pop_song_right2') // select the right arrow

    // scroll functionality
    leftArrow.addEventListener('click', () => {
      popSong.scrollLeft -= 200
    })

    rightArrow.addEventListener('click', () => {
      popSong.scrollLeft += 200
    })
  }, [])

  return (
    <div id='popular_song_heading2'>
      <h1>my songs</h1>
      <div className='btn_s'>
        <i className='bi bi-arrow-left-short' id='pop_song_left2'></i>
        <i className='bi bi-arrow-right-short' id='pop_song_right2'></i>
      </div>
    </div>
  )
}

export default PopularSongHeading2
