import React from 'react';
import {getActivities} from '../actions/activitiesAction';
import {connect} from 'react-redux';
import Carrousel from './Activities-carrousel';

class Activity extends React.Component {
    constructor(){
        super();

        this.state = {
            value: '',
            showComment: false,
            activities: []
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

    handleSubmit(event){
        this.setState({showComment: true})
        event.preventDefault();
    }

    render(){
        var {activities} = this.props.activity;
        return (
            <div id="carrouselAct">
                {this.props.activity.loading ? <p>Loading...</p> : 
                    <div>
                        <Carrousel act={this.state.activities} />
                        <div id="comments">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="comment" onChange={this.handleChange} placeholder=" add a comment..." id="commentInput"></input>
                                <input type="submit" value="Submit"></input>
                            </form> 
                            {this.state.showComment ? <p className="comment">{this.state.value}</p> : ''}
                            <p className="comment">Comentario generico</p>
                        </div>
                    </div>
                }
            </div> 
        )
    }

}

const mapStateToProps = (state) => ({
     activity: state.activity
});


export default connect (mapStateToProps,{getActivities})(Activity);