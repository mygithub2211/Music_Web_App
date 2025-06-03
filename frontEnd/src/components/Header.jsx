import {useState} from "react"
import MenuSide from "./MenuSide.jsx"
import SongSide from "./SongSide.jsx"

function Header(){
    const [setCurrentSong]=useState(null);

    return(
        <header>
            <div id="main_for_menu_and_song">
                <MenuSide/>
                <SongSide setCurrentSong={setCurrentSong}/>
            </div>
       
        </header>
    )
}

export default Header
