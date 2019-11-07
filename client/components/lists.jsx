import React from 'react';

const List = (props) => {
    console.log('id >> ', props.list.list.name)
    return (
        <button id={props.list.list._id} onClick={() => props.click('list', props.list.list._id, props.list.list.name)}>{props.list.list.name}</button>
    )
}

export default List;