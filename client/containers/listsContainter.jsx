import React from 'react';

import List from '../components/lists.jsx';

const ListsContainer = (props) => {
    const arr = props.lists;
    console.log('lists', arr)
    const lists = arr.map(list => <List list={{list}} click={props.click} />);
    console.log('mapped array', lists);
    return (
        <React.Fragment>
            {lists}
        </React.Fragment>
    )
}

export default ListsContainer;