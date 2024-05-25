import React, {Component} from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import NotFound from '../NotFound'
import {Link} from 'react-router-dom'
import './index.css'

class Games extends Component {
  state = {
    videos: [],
    isLoading: true,
    error: null,
    searchQuery: '',
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    try {
      const response = await axios.get(
        'https://games-data-api.vercel.app/games/',
      )
      this.setState({videos: response.data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  onChangeSearch = event => {
    this.setState({searchQuery: event.target.value})
  }

  getFilteredVideos = () => {
    const {videos, searchQuery} = this.state
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  render() {
    const {isLoading, error, searchQuery} = this.state
    const filteredVideos = this.getFilteredVideos()

    return (
      <div className="home-page">
        <TopNavbar
          onChangeSearch={this.onChangeSearch}
          searchQuery={searchQuery}
        />
        <SideNavbar />
        <div className="home-page1">
          {isLoading ? (
            <div className="loader-container">
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <ul className="allViewcard">
              {filteredVideos.length === 0 && <NotFound />}
              {filteredVideos.map(video => (
                <Link to={`/games/${video.id}`} className="item-link">
                  <li key={video.id}>
                    <div className="viewcard">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="movie_img"
                      />

                      <div className="allDeatails">
                        <div>
                          <img
                            src={video.channel.profile_image_url}
                            alt={video.title}
                            className="channelName"
                          />
                        </div>
                        <div className="details">
                          <p className="videoTitle">{video.title}</p>
                          <p className="videoChanle">{video.channel.name}</p>
                          <div className="view-count">
                            <p className="viewCount">
                              {video.view_count} Views
                            </p>
                            <p className="date">
                              {video.channel.no_of_subscribers}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Games
