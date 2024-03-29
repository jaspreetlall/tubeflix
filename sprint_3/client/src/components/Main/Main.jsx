import React from 'react';
import Axios from 'axios';
import Player from '../Player/Player';
import Description from '../Description/Description';
import CommentForm from '../CommentForm/CommentForm';
import Playlist from '../Playlist/Playlist';
import Comments from '../Comments/Comments';

import './Main.scss';

class Main extends React.Component {

  defaultVideoId = '1af0jruup5gu'

  state = {
    currentVideoId: '', 
    mainVideo: {},    
    playlistArray: []
  }

  apiURL = 'http://localhost:8080/videos';

  componentDidMount() {
    const directUrlId = this.props.match.params.id;
    this.apiFetchCalls(directUrlId || this.defaultVideoId);
  }

  componentDidUpdate() {
    const directUrlId = this.props.match.params.id;

    // Checking if there is no video ID is present in URL
    // Also checking if currently loaded video is not the same as default video
    if (!directUrlId && (this.state.currentVideoId !== this.defaultVideoId)) {
      this.apiFetchCalls(this.defaultVideoId);
    }
    // Checking if video ID is present in URL
    // and load only if it is different from the currently loaded video 
    else if (directUrlId && (this.state.currentVideoId !== directUrlId)) {
      this.apiFetchCalls(directUrlId || this.defaultVideoId);
    }
  }

  apiFetchCalls = (videoUrl) => {
    Axios.all([
      Axios.get(`${this.apiURL}`),
      Axios.get(`${this.apiURL}/${videoUrl}`)
    ])
    .then((res) => {
      this.setState({
        mainVideo: res[1].data,
        playlistArray: res[0].data,
        currentVideoId: res[1].data.id
      })
    })
    .catch((err) => console.log(err));
  }
  
  render() {
    return (
      <div className="main">
        {/*
          Player Component
            -> stream = URL of video stream
            -> poster = URL of poster image
            -> duration = total video duration
        */}
        <Player 
          stream={this.state.mainVideo.video}
          poster={this.state.mainVideo.image}
          duration={this.state.mainVideo.duration}
        />

        <div className="main__container container">
          <article className="main__container--body">
            {/* 
              Description Component
              -> currentVideo = Object with full info of current video on the page
            */}
            <Description currentVideo = {this.state.mainVideo}/>

            {/* 
              CommentForm Component
              -> currentVideoId = Video Id of current video on the page
              -> commentsArray = Array of comment objects for current video on the page
            */}
            <CommentForm
              currentVideoId={this.state.mainVideo.id}
              commentsArray={this.state.mainVideo.comments}
            />

            {/*
              Comments Component
              -> commentsArray = Array of comment objects
            */}
            <Comments commentsArray={this.state.mainVideo.comments}/>
            
          </article>
          <section className="main__container--aside">
            {/* 
              Playlist Component
              -> currentVideoId = Video Id of current video on the page
              -> playlistArray = Array of playlist objects
            */}
            <Playlist
              currentVideoId={this.state.currentVideoId}
              playlistArray={this.state.playlistArray}
            />

          </section>
        </div>
      </div>
    )
  }
}

export default Main;