import React from 'react';

const List = (props) => {
    console.log('id >> ', props.list.list.name)
    return (
        <div id="list" >
            <button className="edit" onClick={() => props.click('editList', props.list.list._id, props.list.list.name)} ></button>
            <button id={props.list.list._id} className="list" onClick={() => props.click('list', props.list.list._id, props.list.list.name)}>{props.list.list.name}</button>
            <button className="delete" onClick={() => props.click('deleteList', props.list.list._id)} ></button>
        </div>
    )
}

export default List;