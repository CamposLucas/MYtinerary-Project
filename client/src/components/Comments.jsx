import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getComments} from '../actions/commentsActions'
import ShowComments from './showComments';

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            comments: [],
            isEliminated: false,
            toUpdate: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    async componentDidMount(){
        await this.props.getComments(this.props.id)
        this.setState({comments: this.props.comments.comments})
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    handleSubmit =  async (event) => {
        event.preventDefault();
        const data = {
            author: this.props.auth.user.userName,
            comment: this.state.value
        }

        await axios.put(`http://localhost:5000/itinerary/comments/postcomment/${this.props.id}`, data)
            .then(res => {
                this.setState({comments: res.data})
            })
            .catch(e => {
                console.log(e)
            })

        this.setState({value: ''})
    }

    render(){
        return (
            <div>
                <div>
                    <div>
                        {this.props.auth.isAuthenticated ? 
                            <form onSubmit={this.handleSubmit} className="editForm">
                                <input 
                                    type="text" 
                                    name="comment" 
                                    onChange={this.handleChange} 
                                    placeholder=" add a comment..." 
                                    value={this.state.value} 
                                    className="commentInput">    
                                </input>
                                <input type="submit" value="Submit"></input>
                            </form> :
                            <div></div>
                        }
                    </div>
                    <div>
                        {this.state.comments.map((comment, i) => 
                            <ShowComments com={comment} index={i} id={this.props.id} key={i} />
                        )}
                    </div>  
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) =>({
    auth: state.auth,
    comments: state.comments
})

export default connect(mapStateToProps, {getComments})(Comment);