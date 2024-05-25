import React, {Component} from 'react'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
class SavedVideos extends Component {
  render() {
    return (
      <div className="home-page">
        <TopNavbar />
        <SideNavbar />
        <div className="home-page1">
          <h1>SavedVideos</h1>
        </div>
      </div>
    )
  }
}

export default SavedVideos
