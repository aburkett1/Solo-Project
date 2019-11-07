import React from 'react';

const EditListModal = (props) => (
    <div id="EditListModal" >
        <button onClick={() => props.click('backToLists')} >Back</button>
        <input onChange={(e) => props.newListName(e.target.value)} value={props.editListName} ></input>
        <button onClick={() => props.click('submitNewName')} >Submit</button>
    </div>
)

export default EditListModal;