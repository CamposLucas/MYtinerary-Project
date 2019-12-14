import React from 'react';
import {connect} from 'react-redux';
import DDMenu from './DDMenu';


class Menu extends React.Component{  
  render(){
    return (
      <div id="menu">
        {!this.props.auth.isAuthenticated || !this.props.auth.user.profilePic ?
          <DDMenu icon="icon-user-circle-o" pages={["Login","Create Account"]} links={["/login", "/create-account"]} />
          :
          <DDMenu icon={this.props.auth.user.profilePic} pages={["Login","Create Account"]} links={["/login", "/create-account"]} />
        }
        <DDMenu icon="icon-menu" pages={["Home", "Cities"]} links={["/", "/cities"]}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Menu)