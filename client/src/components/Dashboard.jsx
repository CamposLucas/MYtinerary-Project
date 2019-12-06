import React from "react";
import {Menu} from './Components';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'

class Dashboard extends React.Component {
  handleClick = () => {
    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/login";  
    this.props.logoutUser();
  }

  render() {
    const {user} = this.props.auth
    return (
      <div >
        <Menu />
        <div className="profilePic">
          {user.profilePic ? 
            <img src={user.profilePic} alt={user.userName}></img> :
            <img src={require("../img/profiles/defaultProfile.jpg")} alt="not found"></img> 
            }
        </div>
        <h1>{user.firstName} {user.lastName}</h1>
        <button onClick={this.handleClick} className="logoutButt">Logout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser}) (Dashboard);