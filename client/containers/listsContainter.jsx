import React from 'react';
import React, { Component } from 'react';

import List from '../components/lists';

const ListsContainer = (props) => {
    const arr = props.lists
    const lists = arr.map(list => <List list={list} />)
    return (
        {lists}
    )
}