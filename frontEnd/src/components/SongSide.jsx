import { useState } from 'react'
import axios from 'axios'
import SongContentHome from './home/SongContentHome.jsx'
import SongContentPlayList from './playlist/SongContentPlayList.jsx'
import panda from '/assets/panda.png'
import apiUrl from '../api.jsx' // import the api url

function SongSide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [newSong, setNewSong] = useState(null)
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const handleSearch = async (event) => {
    const query = event.target.value
    setSearchQuery(query)

    if (query.length > 2) {
      try {
        const response = await axios.get(`${apiUrl}/search?query=${query}`)
        setSearchResults(response.data)
      } catch (error) {
        console.error('error fetching search results:', error)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleAddSong = async (song) => {
    try {
      console.log('adding song:', song)
      const response = await axios.post(`${apiUrl}/my_songs`, {
        title: song.title,
        subtitle: song.subtitle,
        src: song.src,
        imgSrc: song.imgSrc,
      })
      console.log('response from adding song:', response)
      if (response.status === 201) {
        setNewSong(song)
        console.log('new song added:', song)
      }
    } catch (error) {
      console.error('error adding song:', error)
    }
  }

  const handleLogout = () => {
    // implement your logout logic here
    console.log('logging out...')
    // example: localStorage.removeItem('authToken')
    window.location.href = '/'
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  return (
    <div id='song_side'>
      <nav>
        <div id='search'>
          <i className='bi bi-search'></i>
          <input
            type='text'
            id='search_input'
            placeholder="hello! let's search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div id='search_result'>
            {searchResults.map((song) => (
              <div
                key={song._id}
                className='search_result_item'
                onClick={() => handleAddSong(song)}
              >
                <h4 style={{ color: '#e6e6e6' }}>{song.title}</h4>
                <p style={{ color: '#b3b3b3' }}>{song.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div id='user' onClick={toggleDropdown}>
          <img src={panda} width='30px' alt='user' />
          {dropdownVisible && (
            <div className='dropdown-menu' onClick={handleLogout}>
              log out
            </div>
          )}
        </div>
      </nav>

      <SongContentHome />
      <SongContentPlayList newSong={newSong} />
    </div>
  )
}

export default SongSide
