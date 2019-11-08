import React from 'react';
import Particles from 'react-particles-js';

const NewListContainer = (props) => (
    <div id="NewListContainer">
        <Particles
          className='modal-bg'
          params={{
            "particles": {
                "number": {
                    "value": 100
                },
                "size": {
                    "value": 2
                }
            }
        }} />
        <button className="backButton" onClick={() => props.click('backToLists')} ></button>
        <input onChange={(e) => props.setListName(e.target.value)} placeholder="New List..."></input>
        <button onClick={() => props.click('submitList')}>Submit</button>
    </div>
)

export default NewListContainer;