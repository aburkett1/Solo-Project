import React from 'react';

const HeaderContainer = (props) => {
    if (props.appState === 'listsView') {
        return (
            <div id="HeaderContainer" className="listsView">
                <h4>Hello, {props.userName}</h4>
                <button onClick={() => props.click('addList')}>+</button>
            </div>
        )
    } else if (props.appState === 'addListView') {
        return (
            <div id="HeaderContainer" className="addListView">
                <h4>Hello, {props.userName}</h4>
            </div>
        )
    } else if (props.appState === 'itemsView') {
        return (
            <div id="HeaderContainer" className="itemsView">
                <button onClick={() => props.click('backButton')}>back</button>
                <h4>{props.currListName}</h4>
            </div>
        )
    } else if (props.appState === 'editItemView') {
        return (
            <div id="HeaderContainer" className="itemsView">
                <button onClick={() => props.click('backButton')}>back</button>
                <h4>{props.currListName}</h4>
            </div>
        )
    } else if (props.appState === 'editListView') {
        return (
            <div id="HeaderContainer" className="listsView">
                <h4>Hello, {props.userName}</h4>
                <button onClick={() => props.click('addList')}>+</button>
            </div>
        )
    }
};

export default HeaderContainer;