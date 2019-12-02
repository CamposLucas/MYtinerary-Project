import React from "react";
import {Menu} from './Components';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'

class Dashboard extends React.Component {
  constructor(){
    super();
  }

  componentDidMount(){
    console.log(this.props.auth.user);
  }

  handleClick = () => {
    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/login";  
    this.props.logoutUser();
  }

  render() {
    const {user} = this.props.auth
    return (
      <div>
        <Menu />
        <h1>Welcome {user.firstName} {user.lastName}</h1>
        <button onClick={this.handleClick} className="logoutButt">Logout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser}) (Dashboard);