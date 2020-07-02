import React from 'react'
// import reactCSS, { hover } from 'reactcss'
import _ from 'lodash'
import styled from 'styled-components';
import SlackCounterGroup from './SlackCounterGroup'
import { find, propEq, findLastIndex, filter } from 'ramda';
import { Icon, InlineIcon } from '@iconify/react';
import smilePlus from '@iconify/icons-fe/smile-plus';
import DeleteReactionMutation, {
} from 'mutations/DeleteReactionMutation';
import CreateReactionMutation, {
} from 'mutations/CreateReactionMutation';

interface SlackCounterProps {
    activeReactions: any;
    user: any;
    onSelect?: any;
    onAdd: any;
    nctId: any;
    currentUserAndStudy: any;
    studyRefetch?: any;
    refetch?: any;
    allReactions:any;
}
interface SlackCounterState {
    showLabel: boolean;
    currentUserAndStudy: any[];
}
const Counter = styled.div`
    display: flex;

    .add{
        cursor: pointer;
        font-family: Slack;
        opacity: 1;
        transition: opacity 0.1s ease-in-out;
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        background: #6BA5D6;
        border: 1px solid #5786AD;
        border-radius: 5px;

    }
    .group-active{
        margin-right: 4px;
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        background: #6BA5D6;
        border: 1px solid #5786AD;
        border-radius: 5px;
        cursor:pointer;
    }
    .group-not-active{
        margin-right: 4px;
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        background: transparent;
        border: 1px solid #5786AD;
        border-radius: 5px;
        cursor:pointer;
    }
`
class SlackCounter extends React.Component<SlackCounterProps, SlackCounterState> {
    state: SlackCounterState = {
        showLabel: false,
        currentUserAndStudy: []
    }


    componentDidMount() {
        this.setState({ currentUserAndStudy: this.props.currentUserAndStudy })
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ currentUserAndStudy: this.props.currentUserAndStudy })
        }
    }
    deleteReactionHelper = (deleteReaction, reaction) => {
        deleteReaction({
            variables: {
                id: reaction.id
            }
        })
            .then(() => this.props.refetch())
            .then(() => this.props.studyRefetch())
    }
    createReactionHelper = (createReaction, reaction) => {
        let reactionID = reaction.id
        createReaction({
            variables: {
                reactionKindId: reactionID,
                nctId: this.props.nctId
            }
        })
            .then(() => this.props.refetch())
            .then(() => this.props.studyRefetch())



    }
    currentReactionFilter=(reactionName)=>{
        //we dont have all the necessary data in activeReactions to interact with the db, 
        //this is where this function comes into play:

        //we take the reaction name and find it in our array with all our reactions that has all that data

        if(this.props.allReactions.data){
            let allReactions = this.props.allReactions.data.reactionKinds
             return find(propEq('name', reactionName))(allReactions)
        }
    }
    findUserReaction = (reaction: any |undefined, userReactions: any[]): object | undefined=>{
        //much like currentReactionFilter() we don't have the necesarry data 
        //to interact with db  in the case a reaction is one a user has already interacted with before
        

        //in order to make sure we are passing the adequate data needed to update our db we look for it in our array userReactions where we can find everything we need
         if (reaction && userReactions){
         return find(propEq('reactionKindId', reaction.id))(userReactions);
     
     }
     return
     }
    renderReactionButtons = () => {
        let userReactionsCurrent = this.state.currentUserAndStudy;
        return (
            this.props.activeReactions.map((reaction, index) => {

                let currentReaction = this.currentReactionFilter(reaction.name)

                let isUserReaction = this.findUserReaction(currentReaction, userReactionsCurrent)

                if (isUserReaction && currentReaction) {
                    return (
                        <div className="group-active" key={reaction.name}>
                            <DeleteReactionMutation>
                                {deleteReaction => (
                                    <SlackCounterGroup
                                        emoji={currentReaction.unicode}
                                        count={reaction.count}
                                        names={' '}
                                        active={' '}
                                        onSelect={() => this.deleteReactionHelper(deleteReaction, isUserReaction)}

                                    />
                                )}
                            </DeleteReactionMutation>
                        </div>
                    )
                } else if (isUserReaction == undefined && currentReaction) {
                    return (
                        <div className="group-not-active" key={reaction.name}>
                            <CreateReactionMutation>
                                {createReaction => (
                                    <SlackCounterGroup
                                        emoji={currentReaction.unicode}
                                        count={reaction.count}
                                        names={' '}
                                        active={' '}
                                        onSelect={() => this.createReactionHelper(createReaction, currentReaction)}
                                    />
                                )

                                }
                            </CreateReactionMutation>



                        </div>
                    )
                } else {
                    return
                }

            })

        )
    }
    render() {
        let addEmoji = <Icon icon={smilePlus} width="1.5em" />
        let userReactionsCurrent = this.state.currentUserAndStudy;
        return (
            <Counter>

                {this.renderReactionButtons()}
                <div className="add" onClick={this.props.onAdd}>
                    <SlackCounterGroup
                        emoji={addEmoji}
                        count={''}
                        names={''}
                        active={''}
                        onSelect={''}

                    />

                </div>
            </Counter>
        )
    }


}

export default SlackCounter