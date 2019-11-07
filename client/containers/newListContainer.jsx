import React from 'react';

const NewListContainer = (props) => (
    <div id="NewListContainer">
        <input onChange={(e) => props.setListName(e.target.value)} placeholder="New List..."></input>
        <button onClick={() => props.click('submitList')}>Submit</button>
    </div>
)

export default NewListContainer;