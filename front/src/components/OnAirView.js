import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { SERVER } from '../networkGenerics';

class OnAirView extends Component {

  constructor (props) {
    super(props);
    this.state = {
      songs: null
    }
  }

  componentDidMount () {
    this.getPlaylist();
    this.timeout = setTimeout(this.getPlaylist, 30 * 1000);
  }

  componentWillUnmount () {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  getPlaylist = () => {
    this.props.user.request(SERVER.api_url + '/radio/song/played/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      this.setState({songs: data});
    }).catch(() => {
      this.setState({'songs': null});
    })
  }

  makeSongInfo ({artist, title, album}, index) {
    const it_album = (album) ? <i> - { album }</i> : null;

    // the key is not good enough, if a song is played >1 times in 10 songs.
    return <Segment key={ artist + title + album + index }>
      <Header>
        <Header.Content>
          { title }
        </Header.Content>
        <Header.Subheader>
          { artist } { it_album }
        </Header.Subheader>
      </Header>
    </Segment>;
  }

  render () {
    return <div id="on-air-view">
      {
        (this.state.songs != null && <Segment.Group>
          {
            this.state.songs.map(this.makeSongInfo)
          }
        </Segment.Group>) || <Header>
          Loading...
        </Header>
      }
    </div>
  }
}

export default OnAirView;
