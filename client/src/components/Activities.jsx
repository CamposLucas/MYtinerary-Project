import React from 'react';
import {getActivities} from '../actions/activitiesAction';
import {getComments} from '../actions/commentsActions';
import {connect} from 'react-redux';
import Carrousel from './Activities-carrousel';
import axios from 'axios';

class Activity extends React.Component {
    constructor(){
        super();

        this.state = {
            value:'',
            comments: [],
            activities: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.props.getComments(this.props.id);
        this.setState({comments: nextProps.comments.comments})
    }

  
    async componentDidMount(){
        await this.props.getActivities(this.props.id)
        this.setState({activities: this.props.activity.activities})

        await this.props.getComments(this.props.id);
        this.setState({comments: this.props.comments.comments})

    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();

        const data = {
            author: this.props.auth.user.userName,
            comment: this.state.value
        }
        axios.put(`http://localhost:5000/itinerary/comments/postcomment/${this.props.id}`, data)
        this.setState({value:''})
    }

    render(){
        return (
            <div id="carrouselAct">
                {this.props.activity.loading ? <p>Loading...</p> : 
                    <div>
                        <Carrousel act={this.state.activities} />
                        <div id="comments">
                            {this.props.auth.isAuthenticated ? 
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text" name="comment" onChange={this.handleChange} placeholder=" add a comment..." value={this.state.value} id="commentInput"></input>
                                    <input type="submit" value="Submit"></input>
                                </form> :
                                <div></div>
                            }
                            {this.state.comments.map(comment =>
                                <div className="comment">
                                    <p className="authorP">{comment.author}</p>
                                    <p className="commentP">{comment.comment}</p>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div> 
        )
    }

}

const mapStateToProps = (state) => ({
     activity: state.activity,
     comments: state.comments,
     auth: state.auth
});


export default connect (mapStateToProps,{getActivities, getComments})(Activity);