import React from 'react';
import Particles from 'react-particles-js';

const EditItemModal = (props) => (
    <div id="EditItemModal" >
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
        <button className="backButton" onClick={() => props.click('backToItems')} ></button>
        <input onChange={(e) => props.newItemData(e.target.value)} value={props.editItemData} ></input>
        <button onClick={() => props.click('submitNewData')} >Submit</button>
    </div>
)

export default EditItemModal;