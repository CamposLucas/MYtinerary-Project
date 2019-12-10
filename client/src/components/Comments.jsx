import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateComment} from '../actions/commentsActions'

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:'',
            author: props.com.author,
            comment: props.com.comment,
            i: props.index,
            isEliminated: false,
            toUpdate: false,
        }

    }


    handleDelete = () => {
        const data = {
            author: this.state.author,
            comment: this.state.comment
        }
        axios.put(`http://localhost:5000/itinerary/comments/deletecomment/${this.props.id}`, data)

        this.setState({isEliminated: true})
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleUpdate = () => {
        this.setState({toUpdate: true})
     }

    submitUpdate = async (e) => {
        e.preventDefault();
        const data = {
            author: this.state.author, 
            comment: this.state.value,
            i: this.state.i
        }

        this.props.updateComment(this.props.id, data)
        this.setState({toUpdate: false})        
    }

    render(){
        return (
            <div>
                {this.state.isEliminated ? 
                    <div className="deletedComment">
                        <p>Deleted</p>
                    </div>
                    :
                    this.state.toUpdate ? 
                        <div>
                            <form onSubmit={this.submitUpdate}>
                                <input 
                                    type="text" 
                                    value={this.state.value} 
                                    placeholder={this.state.comment}
                                    onChange={this.handleChange} 
                                    id="commentInput">
                                </input>
                                <input type="submit" value="Update"></input>
                            </form>
                        </div>
                        :
                        <div className="comment">
                            <div className="commentInfo">
                                <p className="authorP">{this.state.author}</p>
                                <p className="commentP">{this.state.comment}</p>
                            </div>
                                {this.props.auth.user.email === this.state.author ?
                                    <div className="editSet">
                                        <p onClick={this.handleUpdate}>Update</p>
                                        <p onClick={this.handleDelete}>Delete</p>
                                    </div>
                                    :
                                    <div></div>
                                }    
                        </div>
                }
            </div>
        )
    }
}

var mapStateToProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateToProps, {updateComment})(Comment);