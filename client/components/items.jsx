import React from 'react';

const Item = (props) => {
    if (props.item.item.completed) {
        return (
            <div id="Item">
                <input className="checkmark" type="image" src="http://www.clker.com/cliparts/4/h/F/B/m/4/nxt-checkbox-checked-ok-md.png" onClick={() => props.click('checkBox', props.item.item._id, props.item.item.name, props.item.item.completed)} ></input>
                <div id={props.item.item._id} >{props.item.item.data}</div>
                <button className="edit" onClick={() => props.click('editItem', props.item.item._id, props.item.item.data)} ></button>
                <button className="delete" onClick={() => props.click('deleteItem', props.item.item._id)} ></button>
            </div>
        )
    } else if (!props.item.item.completed) {
        return (
            <div id="Item">
                <input className="checkmark" type="image" src="http://www.clker.com/cliparts/e/q/p/N/s/G/checkbox-unchecked-md.png" onClick={() => props.click('checkBox', props.item.item._id, props.item.item.name, props.item.item.completed)} ></input>
                <div id={props.item.item._id} >{props.item.item.data}</div>
                <button className="edit" onClick={() => props.click('editItem', props.item.item._id, props.item.item.data)} ></button>
                <button className="delete" onClick={() => props.click('deleteItem', props.item.item._id)} ></button>
            </div>
        )
    } 
}

export default Item;