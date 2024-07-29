import React from "react";
import PopularSongHeading2 from "./PopularSongHeading2";
import SongList2 from "./SongList2";

function SongContentPlayList({ newSong }) {
    return (
        <div id="song_content_playlist">
            <PopularSongHeading2 />
            <SongList2 newSong={newSong} />
        </div>
    );
}

export default SongContentPlayList;
