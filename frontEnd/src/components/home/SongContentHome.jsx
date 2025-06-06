import PopularSongHeading from './PopularSongHeading.jsx'
import SongList from './SongList.jsx'

function SongContentHome() {
    return (
        <div id='song_content_home'>
            {/* render popular song heading and song list */}
            <PopularSongHeading />
            <SongList />
        </div>
    )
}

export default SongContentHome
