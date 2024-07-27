import React, { useState } from "react";
import MenuSide from "./MenuSide";
import SongSide from "./SongSide";

function Header() {
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <header>
            <div id="main_for_menu_and_song">
                <MenuSide />
                <SongSide setCurrentSong={setCurrentSong} />
            </div>
       
        </header>
    );
}

export default Header;
