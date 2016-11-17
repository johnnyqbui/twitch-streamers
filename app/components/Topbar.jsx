const React = require('react');

// Stateless component
const Topbar = () => ({
  render: function() {
    return <div className="top-bar">
      <div className="top-bar-left">
          <ul className="menu">
            <li><a href="https://www.twitch.tv" target="_blank"><i className="fa fa-twitch menu-text"></i></a></li>
            <li>Streamers</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <div className="menu button-group">
            <button className="button hollow" onClick={() => {this.props.onClickSort(this.props.streamers, "all")}}>All</button>
            <button className = "button success hollow" onClick = {() => {this.props.onClickSort(this.props.streamers, "online")}}>Online</button>
            <button className = "button alert hollow" onClick = {() => {this.props.onClickSort(this.props.streamers, "offline")}}>Offline</button>
          </div>
        </div>
      </div>
  }
})

module.exports = Topbar;