const React = require('react');

// Stateless component
const Sidebar = () => ({
  render: function() {
    // Get status of streamers
    const renderStreamerInfo = (streamer) => {

      const {status, username, url} = streamer;
      if (status === "online") {
        return <div>
          <i className="fa fa-circle online" aria-hidden="true"></i>
          <b>{username}</b><br></br><i>{streamer.stream.game}</i>
          <a href={url} target="_blank"><button className="button hollow">Channel</button></a>
          </div>
      } else if (status === "offline") {
        return <span>
            <i className="fa fa-circle offline" aria-hidden="true"></i>{username}
            <a href={url} target="_blank"><button className="button hollow">Channel</button></a>
          </span>
      } else {
        return <span>
            <i className="fa fa-circle offline" aria-hidden="true"></i> {username}
            <span className="status offline"> [Does not exist or has been closed]</span>
          </span>
      }
    }
    return (
      <ul className="sidebar menu vertical">{
          this.props.streamers.map((streamer, id) => {
            return (
                 <li onClick={() => this.props.onStreamerClick(streamer)} key={id}>{renderStreamerInfo(streamer, id)}</li>
              )
          })
       }</ul>
    )
  }
})

module.exports = Sidebar;