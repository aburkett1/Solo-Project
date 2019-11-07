import React from 'react';

const EditItemModal = (props) => (
    <div id="EditItemModal" >
        <button onClick={() => props.click('backToItems')} >Back</button>
        <input onChange={(e) => props.newItemData(e.target.value)} value={props.editItemData} ></input>
        <button onClick={() => props.click('submitNewData')} >Submit</button>
    </div>
)

export default EditItemModal;