import React from 'react';
import {getActivities} from '../actions/activitiesAction';
import {getComments, putComments} from '../actions/commentsActions';
import {connect} from 'react-redux';
import Carrousel from './Activities-carrousel';
import Comment from './Comments';

class Activity extends React.Component {
    constructor(){
        super();

        this.state = {
            value:'',
            activities: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
      
    async componentDidMount(){
        await this.props.getActivities(this.props.id)
        this.setState({activities: this.props.activity.activities})
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

        await this.props.putComments(this.props.id, data);

        this.setState({value: '', comments: this.props.comments.comments, reload: true})
    }

    render(){
        return (
            <div id="carrouselAct">
                {this.props.activity.loading ? <p>Loading...</p> : 
                    <div>
                        <Carrousel act={this.state.activities} />
                        <div>
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
     itinerary: state.itinerary,
     auth: state.auth
});


export default connect (mapStateToProps,{getActivities, getComments, putComments})(Activity);