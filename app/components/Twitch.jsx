const React = require('react');
const Topbar = require('Topbar');
const Sidebar = require('Sidebar');
const Display = require('Display');
const twitchApi = require('twitchApi');

const Twitch = React.createClass({
  getDefaultProps: function() {
    return {
      streamers: ['DansGaming', 'CarcinogenSDA', 'FreeCodeCamp', 'BobRoss', 'OgamingSC2', 'threedogg', 'brunofin', 'NairoMK', 'UberHaxorNova'],
    }
  },

  getInitialState: function() {
    return {
      streamerInfo: [],
      displayStreamer: [],
      initialSorted: [],
      isLoading: true
    }
  },

  componentDidMount: function() {
    this.props.streamers.map((streamer) => {
      // Obtain streamer info
      twitchApi.getStreamers(streamer).then(json => {
          const url = "https://www.twitch.tv/" + streamer;
          // Create username and get online/offline status information to combine with json data
          const username = { username: streamer };
          const statusUrl = json.stream ? {
            status: "online",
            url: url
          } : {
            status: "offline",
            url: url
          };
          const combinedData = Object.assign(username, statusUrl, json);

          // Get state streamerInfo array to push data into
          const streamerInfoArr = this.state.streamerInfo;
          streamerInfoArr.push(combinedData);

          // Sort once all data has been added to array
          if (streamerInfoArr.length === this.props.streamers.length) {
            this.handleSort(streamerInfoArr);
          }
      });
    });
  },

  handleSort: function(streamers, type) {
    // Initial Sort
    if (!type) {
      streamers.sort((a, b) => {
        if (typeof a.status === "number") {
          return 1
        } else {
          return a.status.localeCompare(b.status)
        };
      });
      streamers.reverse();
      this.setState({
        streamerInfo: streamers,
        initialSorted: streamers,
        isLoading: false
      })
    } else {
      // Manual Sort
      const online = [];
      const offline = [];
      streamers.forEach(function(streamer) {
       streamer.status === "online" ? online.push(streamer) : streamer.status === "offline" || 404 ? offline.push(streamer) : '';
      })
      switch (type) {
        case 'all':
          this.setState({
            streamerInfo: this.state.initialSorted
          })
          break;
        case 'online':
          this.setState({
            streamerInfo: online
          })
          break;
        case 'offline':
          this.setState({
            streamerInfo: offline
          })
          break;
      }
    }
  },

  handleStreamerClick: function(streamer) {
    const streamerInfo = streamer.stream;
    if (streamerInfo === null) {
      this.setState({ displayStreamer: streamer.username + " is Offline" })
    } else if (streamerInfo === undefined) {
      this.setState({ displayStreamer: streamer.username + " does not exist or account has been closed" })
    } else {
      this.setState({ displayStreamer: streamerInfo })
    }
  },

  render: function() {
    // Render once all data is loaded
    const renderSideBar = () => {
      if (this.state.isLoading) {
        return <h1 className="loading"> Loading... </h1>
      } else {
        return <Sidebar streamers={this.state.streamerInfo} onStreamerClick={this.handleStreamerClick}/>
      }
    }
    return (
      <div className="container">
        <Topbar streamers={this.state.initialSorted} onClickSort={this.handleSort}/>
        <div className="mainContainer">
          {renderSideBar()}
          <Display streamer={this.state.displayStreamer}/>
        </div>
       </div>
    )
  }
});

module.exports = Twitch;