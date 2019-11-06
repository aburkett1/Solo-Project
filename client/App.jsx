import React, { Component } from 'react';
import { render } from 'react-dom';

// ***** Containers / Components ***** //
import HeaderContainer from './containers/headerContainer';
import ListsContainer from './containers/listsContainter';
import AddList from './components/addList';
import SearchLists from './components/searchLists';
import NewItemContainer from './containers/newItemContainer';
import ItemsContainer from './containers/itemsContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState = 'listsView',
            lists = [],
            items = [],
            currListName = '',
            newListName = '',
            newItemData = '',
            userName = 'Austin',
        }
        this.setListName = this.setListName.bind(this);
        this.setItemData = this.setItemData.bind(this);
        this.click = this.click.bind(this);
    }

    componentWillMount() {

    }

    // ***** onChange for List Name ***** //
    setListName(listName) {
        this.setState({ newListName: listName });
    }

    // ***** onChange for Item Data ***** //
    setItemData(itemData) {
        this.setState({ newItemData: itemData })
    }

    // ***** onClicks ***** //
    click(button) {
        if (button === 'addList') {

        } else if (button === 'backButton') {

        } else if (button === 'addItem') {

        }
    }

    render() {
        if (this.state.appState === 'listsView') {
            return (
                <React.Fragment>
                    <HeaderContainer
                        appState={this.state.appState}
                        userName={this.state.userName}
                    />
                    <ListsContainer
                        lists={this.state.lists}
                    />
                </React.Fragment>
                
            )
        } else if (this.state.appState === 'addListView') {
            return (
                <React.Fragment>
                    <HeaderContainer
                        appState={this.state.appState}
                        userName={this.state.userName}
                    />
                    <AddList
                        setListName={this.setListName}
                        click={this.click}
                    />
                    <ListsContainer
                        lists={this.state.lists}
                    />
                </React.Fragment>
            )
        } else if (this.state.appState === 'itemsView') {
            return (
                <React.Fragment>
                    <HeaderContainer
                        appState={this.state.appState}
                        currListName={this.state.currListName}
                    />
                    <NewItemContainer
                        setItemData={this.setItemData}
                        click={this.click}
                    />
                    <ItemsContainer
                        items={this.state.items}
                    />
                </React.Fragment>
            )
        }
    }
}

render(<App/>, document.getElementById('app'));