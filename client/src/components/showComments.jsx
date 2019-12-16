import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class ShowComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            comment: props.com,
            i: props.index,
            toUpdate: false,
            isEliminated: false
        }
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
            author: this.state.comment.author, 
            comment: this.state.value,
            i: this.state.i
        }

        await axios.put(`http://localhost:5000/itinerary/comments/updatecomment/${this.props.id}`, data)
            .then(res => {
                return res
            })
            .then(data => {
                this.setState({comment: data.data[this.state.i]})
            })
            .catch(e => {
                console.log(e)
            })
        this.setState({toUpdate: false})        
    }

    handleDelete = () => {
        const data = {
            author: this.state.comment.author,
            comment: this.state.comment.comment
        }
        axios.put(`http://localhost:5000/itinerary/comments/deletecomment/${this.props.id}`, data)

        this.setState({isEliminated: true})
    }

    render(){
        return (
            this.state.isEliminated ? 
                <div className="deletedComment">
                    <p>Deleted</p>
                </div>
                :
                this.state.toUpdate ? 
                    <div>
                        <form onSubmit={this.submitUpdate} className="editForm">
                            <input 
                                type="text" 
                                value={this.state.value} 
                                placeholder={this.state.comment.comment}
                                onChange={this.handleChange} 
                                className="editInput">
                            </input>
                            <input type="submit" value="Update"></input>
                        </form>
                    </div>
                    :
                    <div className="comment">
                        <div className="commentInfo">
                            <p className="authorP">{this.state.comment.author}</p>
                            <p className="commentP">{this.state.comment.comment}</p>
                        </div>
                            {this.props.auth.user.userName === this.state.comment.author ?
                                <div className="editSet">
                                    <p onClick={this.handleUpdate}>Update</p>
                                    <p onClick={this.handleDelete}>Delete</p>
                                </div>
                                :
                                <div></div>
                            }    
                    </div>
            )     
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps) (ShowComments);