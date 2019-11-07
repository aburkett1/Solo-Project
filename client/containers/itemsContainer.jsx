import React from 'react';

import Item from '../components/items.jsx';

const ItemsContainer = (props) => {
    const arr = props.items;
    const items = arr.map(item => <Item item={{item}} click={props.click} />);
    return (
        <div id="ItemsContainer">
            {items}
        </div>
    )
}

export default ItemsContainer;