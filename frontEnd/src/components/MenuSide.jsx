import { useState, useEffect } from "react";
import readLoveHeart from "/assets/readHeart.png";

function MenuSide() {
    // Set the initial active tab to "home" to match the initial display state
    const [activeTab, setActiveTab] = useState("home");

    useEffect(() => {
        const homeTab = document.querySelector("#playlist h4:nth-of-type(1)");
        const playlistTab = document.querySelector("#playlist h4:nth-of-type(2)");
        const songContentHome = document.querySelector("#song_content_home");
        const songContentPlaylist = document.querySelector("#song_content_playlist");

        // Show Home content initially
        songContentHome.style.display = "block";
        songContentPlaylist.style.display = "none";

        homeTab.addEventListener("click", () => {
            // Show Home content, hide Playlist content
            songContentHome.style.display = "block";
            songContentPlaylist.style.display = "none";
            // Update active states
            setActiveTab("home");
        });

        playlistTab.addEventListener("click", () => {
            // Show Playlist content, hide Home content
            songContentHome.style.display = "none";
            songContentPlaylist.style.display = "block";
            // Update active states
            setActiveTab("playlist");
        });
    }, []);

    return (
        <div id="menu_side">
            <h1>Oreo Remix</h1>
            <div id="playlist">
                <h4 className="active"><span></span><i className="bi bi-music-note-beamed"></i> Home</h4>
                <h4 className="active"><span></span><i className="bi bi-music-note-beamed"></i> Playlist</h4>
            </div>
            <div id="Logo">
                <img src={readLoveHeart} style={{width: "430px", marginTop: "250px"}} alt="Logo" />
            </div>
        </div>
    );
}

export default MenuSide;
