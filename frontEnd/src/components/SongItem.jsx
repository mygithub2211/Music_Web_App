import React from "react";

function SongItem(props) {
    // FUNCTION TO HANDLE CLICK EVENTS
    const handleClick = () => {
        props.onSelect(); // CALL THE onSelect FUNCTION PASSED IN PROPS
    }; 

    return (
        <li className="songItem" onClick={handleClick}>
            {/* CONTAINER FOR THE IMAGE AND PLAY ICON */}
            <div className="img_play">
                {/* DISPLAY SONG IMAGE */}
                <img src={props.imgSrc} alt={props.title} />
                {/* PLAY ICON */}
                <i className="bi playListPlay bi-play-circle-fill" id="8"></i>
            </div>
            {/* DISPLAY SONG TITLE AND SUBTITLE */}
            <h5>
                {props.title}<br />
                {/* DISPLAY SUBTITLE UNDER THE TITLE */}
                <div className="subtitle">{props.subtitle}</div>
            </h5>
        </li>
    );
}

export default SongItem;
