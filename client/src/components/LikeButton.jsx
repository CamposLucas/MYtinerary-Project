import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import {getFavs} from '../actions/likesActions';

class LikeButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isLiked: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

   componentWillReceiveProps(props) {
     this.props.getFavs(this.props.auth.user._id);
      if(this.props.likes.liked.indexOf(this.props.id) !== -1) {
        this.setState({isLiked: true})
      } else {
        this.setState({isLiked: false})
      }
  }
  

  componentDidMount(){
    this.props.getFavs(this.props.auth.user._id);
    if(this.props.likes.liked.indexOf(this.props.id) !== -1) {
      this.setState({isLiked: true})
    } else {
      this.setState({isLiked: false})
    }
  }

  async handleClick(){
    var itId = this.props.id;
    var userId = this.props.auth.user._id;
    await axios.put(`http://localhost:5000/users/likes/postlike/${userId}/${itId}`)
      .then(res => {
        console.log(res.data)
        this.props.getFavs(userId);
        this.setState({isLiked: !this.state.isLiked})
      })
      .catch(e => {
        console.log(e.response.data)
      })
  }

  render(){
    return(
      <i
        onClick={this.handleClick} 
        className={this.state.isLiked ? "icon-heart liked" : "icon-heart"}>
      </i>
    )
  }
}

const mapStateToProps = state => ({
  likes: state.likes,
  auth: state.auth
})

export default connect(mapStateToProps, {getFavs})(LikeButton);