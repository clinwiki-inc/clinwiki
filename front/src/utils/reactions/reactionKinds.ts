import { find, propEq, propOr } from 'ramda';

export const reactionCharacterFromName =(val:string):string | undefined=>{
    switch (val) {
        case 'like':
            return '👍'
        case 'dislike':
            return '👎'
        case 'heart':
            return '❤️'
        case 'skull_and_cross_bones':
            return '☠️'
        default:
            return undefined
    }

}
export const reactionIdFromCharacter = (val: string |undefined): number | undefined=> {
    switch (val) {
        case '👍':
            return 1;
        case '👎':
            return 2;
        case '❤️':
            return 3;
        case '☠️':
            return 4;
        default:
            return undefined;
    }
};
export const activeReactions =(reactionsConfig)=>{
    let obj = JSON.parse(reactionsConfig)
    let activeArray: any[]=[]
    obj.map((reaction)=>{
       activeArray.push( reactionCharacterFromName(reaction.name))
    })
    return activeArray
}

export const isReactionUnique = (val: string |undefined, valArray: any[]): object | undefined=>{
    let reactionId = reactionIdFromCharacter(val)
    if (reactionId && valArray){
    return find(propEq('reactionKindId', reactionId))(valArray);

}
return
}
const reactionKinds=(e)=>{
    return
}

 export default reactionKinds;