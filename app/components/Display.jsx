const React = require('react');

// Stateless component
const Display = () => ({
  render: function() {
    const displayStreamer = this.props.streamer;
    const displayInfo = () => {
      if (displayStreamer.game) {
        const {display_name, url, status} = displayStreamer.channel;
        const {game, viewers} = displayStreamer;
        const preview = displayStreamer.preview.large;
        return <div className="display">
        <div className="header">
          <h4><b>{display_name}</b></h4>
          <p><i>{status}</i></p>
        </div>
        <div className="streamer">
          <div className="streamInfo">
            <h4 className="game">{game}</h4>
            <p>Viewers: {viewers}</p>
          </div>
          <div className="preview">
            <a href={url} target="_blank"><img src={preview} alt={display_name}/></a>
          </div>
         </div>
        </div>
      } else {
        return <h4 className="offlineText">{displayStreamer}</h4>
      }
    }
    return (displayInfo())
  }
})

module.exports = Display;