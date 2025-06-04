function SongItem(props) {
  // function to handle click events
  const handleClick = () => {
    props.onSelect() // call the onSelect() passed in props
  }

  return (
    <li className='songItem' onClick={handleClick}>
      {/* container for the image and play icon */}
      <div className='img_play'>
        {/* display song image */}
        <img src={props.imgSrc} alt={props.title} />
        {/* play icon */}
        <i className='bi playListPlay bi-play-circle-fill' id='8'></i>
      </div>

      {/* display song title and subtitle */}
      <h5>
        {props.title}
        <br />
        {/* display subtitle under the title */}
        <div className='subtitle'>{props.subtitle}</div>
      </h5>
    </li>
  )
}

export default SongItem
