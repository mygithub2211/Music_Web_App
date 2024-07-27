import PopularSongHeading  from "./PopularSongHeading";
import SongList from "./SongList"; 

function SongContentHome() {
    return (
        <div id="song_content_home">
            <PopularSongHeading />
            <SongList />
        </div>
    );
}

export default SongContentHome;
