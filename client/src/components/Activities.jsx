import React from 'react';
import {getActivities} from '../actions/activitiesAction';
import {getComments, putComments} from '../actions/commentsActions';
import {connect} from 'react-redux';
import Carrousel from './Activities-carrousel';
import Comment from './Comments';
import axios from 'axios';

class Activity extends React.Component {
    constructor(){
        super();

        this.state = {
            value:'',
            comments: [],
            activities: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    getComments(id){
        console.log("gola")
        axios.get(`http://localhost:5000/itinerary/comments/${id}`)
            .then(res => {
              this.setState({comments: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }
  
    async componentDidMount(){
        await this.props.getActivities(this.props.id)
        this.setState({activities: this.props.activity.activities})

        this.getComments(this.props.id)
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
        const respuesta = await axios.put(`http://localhost:5000/itinerary/comments/postcomment/${this.props.id}`, data)
        // this.setState({comments: respuesta.data})
        this.getComments(this.props.id)

        this.setState({value: ''})
        
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
                                    <input 
                                        type="text" 
                                        name="comment" 
                                        onChange={this.handleChange} 
                                        placeholder=" add a comment..." 
                                        value={this.state.value} 
                                        id="commentInput">    
                                    </input>
                                    <input type="submit" value="Submit"></input>
                                </form> :
                                <div></div>
                            }
                            {this.state.comments.map((comment, i) =>
                                <Comment get={this.getComments} com={comment} id={this.props.id} index={i} />
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


export default connect (mapStateToProps,{getActivities, getComments, putComments})(Activity);