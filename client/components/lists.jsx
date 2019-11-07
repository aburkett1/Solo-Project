import React from 'react';

const List = (props) => {
    console.log('id >> ', props.list.list.name)
    return (
        <div id="list" >
            <button onClick={() => props.click('editList', props.list.list._id, props.list.list.name)} >Edit</button>
            <button id={props.list.list._id} onClick={() => props.click('list', props.list.list._id, props.list.list.name)}>{props.list.list.name}</button>
            <button onClick={() => props.click('deleteList', props.list.list._id)} >Delete</button>
        </div>
    )
}

export default List;