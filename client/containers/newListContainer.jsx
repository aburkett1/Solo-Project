import React from 'react';

const NewListContainer = (props) => (
    <div id="NewListContainer">
        <input onChange={() => props.setListName()}></input>
        <button onClick={() => props.click('submitList')}>Submit</button>
    </div>
)

export default NewListContainer;