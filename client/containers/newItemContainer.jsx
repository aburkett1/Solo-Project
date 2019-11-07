import React from 'react';

const NewItemContainer = (props) => (
    <div id="NewItemContainer">
        <input onChange={(e) => props.setItemData(e.target.value)} placeholder="Add New Item..."></input>
        <button onClick={() => props.click('submitItem')}>Submit</button>
    </div>
)

export default NewItemContainer;