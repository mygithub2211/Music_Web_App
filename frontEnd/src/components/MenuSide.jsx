import { useState, useEffect } from 'react'
import readLoveHeart from '/assets/readHeart.png'

function MenuSide() {
  // set the initial active tab to 'home' to match the initial display state
  const [setActiveTab] = useState('home')

  useEffect(() => {
    const homeTab = document.querySelector('#playlist h4:nth-of-type(1)')
    const playlistTab = document.querySelector('#playlist h4:nth-of-type(2)')
    const songContentHome = document.querySelector('#song_content_home')
    const songContentPlaylist = document.querySelector('#song_content_playlist')

    // show home content initially
    songContentHome.style.display = 'block'
    songContentPlaylist.style.display = 'none'

    homeTab.addEventListener('click', () => {
      // show home content, hide playlist content
      songContentHome.style.display = 'block'
      songContentPlaylist.style.display = 'none'
      // update active states
      setActiveTab('home')
    })

    playlistTab.addEventListener('click', () => {
      // show playlist content, hide home content
      songContentHome.style.display = 'none'
      songContentPlaylist.style.display = 'block'
      // update active states
      setActiveTab('playlist')
    })
  }, [])

  return (
    <div id='menu_side'>
      <h1>Oreo Remix</h1>
      <div id='playlist'>
        <h4 className='active'>
          <span></span>
          <i className='bi bi-music-note-beamed'></i>home
        </h4>
        <h4 className='active'>
          <span></span>
          <i className='bi bi-music-note-beamed'></i>playlist
        </h4>
      </div>
      <div id='Logo'>
        <img
          src={readLoveHeart}
          style={{ width: '400px', marginTop: '200px' }}
          alt='logo'
        />
      </div>
    </div>
  )
}

export default MenuSide
