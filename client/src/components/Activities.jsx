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
            comments: [],
            activities: [],
            reload: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    async componentDidUpdate(nextProps) {
        if(nextProps.comments.comments !== this.props.comments.comments) {
            this.setState({reload: false})
            await this.setState({
                comments: this.props.comments.comments
            })
            this.setState({reload: true})
        }
    }
      
    async componentDidMount(){
        await this.props.getActivities(this.props.id)
        this.setState({activities: this.props.activity.activities})

        await this.props.getComments(this.props.id)
        this.setState({comments: this.props.comments.comments, reload: true})
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
                                this.state.reload ?
                                    <Comment get={this.getComments} com={comment} id={this.props.id} index={i} />
                                    :
                                    <div></div>
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