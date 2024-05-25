import React, {Component} from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import {AiOutlineLike} from 'react-icons/ai'
import {AiOutlineDislike} from 'react-icons/ai'
import {FaRegSave} from 'react-icons/fa'
import './index.css'

class TrendingDetails extends Component {
  state = {
    videos: [],
    isLoading: true,
    error: null,
    liked: false,
    disliked: false,
    saved: false,
  }

  componentDidMount() {
    this.fetchMovie()
  }

  fetchMovie = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await axios.get(
        `https://trending-api.vercel.app/trendVideos/${id}`,
      )
      this.setState({videos: response.data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  likeBtnPressed = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      disliked: false, // Ensure only one is selected at a time
    }))
  }

  unlikeBtnPressed = () => {
    this.setState(prevState => ({
      disliked: !prevState.disliked,
      liked: false, // Ensure only one is selected at a time
    }))
  }

  saveBtnPressed = () => {
    this.setState(prevState => ({
      saved: !prevState.saved,
    }))
  }

  render() {
    const {isLoading, error, videos, liked, disliked, saved} = this.state

    return (
      <div className="home-page">
        <TopNavbar />
        <SideNavbar />
        <div className="home-page1">
          {isLoading ? (
            <div className="loader-container">
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="movie-details">
              <div className="trailer-container">
                <iframe
                  title="movie-trailer"
                  width="1000px"
                  height="400"
                  src={videos.video_url}
                  frameBorder="0"
                  allowFullScreen
                  className="iframe"
                ></iframe>
              </div>
              <div className="allDeatails">
                <div>
                  <img
                    src={videos.channel.profile_image_url}
                    alt={videos.channel.name}
                    className="channelName"
                  />
                </div>

                <div className="movie-deatils-down">
                  <div className="details">
                    <p className="videoTitle">{videos.title}</p>
                    <p className="videoChanle">{videos.channel.name}</p>
                    <div className="view-count">
                      <p className="viewCount">{videos.view_count} Views</p>
                      <p className="date">{videos.published_at}</p>
                    </div>
                  </div>
                  <div className="like-dislike-save">
                    <button
                      onClick={this.likeBtnPressed}
                      className={liked ? 'active' : ''}
                    >
                      <AiOutlineLike className="icon-l" />
                    </button>
                    <button
                      onClick={this.unlikeBtnPressed}
                      className={disliked ? 'active' : ''}
                    >
                      <AiOutlineDislike className="icon-d" />
                    </button>
                    <button
                      onClick={this.saveBtnPressed}
                      className={saved ? 'active' : ''}
                    >
                      <FaRegSave className="icon-s" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="comments">
                <h3>Comments</h3>
                {videos.comments.map(comment => (
                  <div key={comment.name_of_viewer} className="comment-details">
                    <div className="comment-user-prfile">
                      <p>{comment.profile_image_url}</p>
                    </div>
                    <div className="comment-all-deatils">
                      <p className="commentOne">{comment.name_of_viewer}</p>
                      <p className="commentOne">{comment.how_much_days_ago}</p>
                      <p className="commentOne">
                        {comment.comment_description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default TrendingDetails
