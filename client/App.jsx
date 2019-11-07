import React, { Component } from 'react';

// ***** Containers / Components ***** //
import HeaderContainer from './containers/headerContainer.jsx';
import ListsContainer from './containers/listsContainter.jsx';
import NewListContainer from './containers/newListContainer.jsx';
import SearchLists from './components/searchLists.jsx';
import NewItemContainer from './containers/newItemContainer.jsx';
import ItemsContainer from './containers/itemsContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: 'listsView',
            lists: [],
            items: [],
            currListName: '',
            newList: {
                name: '',
                placement: 1,
            },
            newItem: {
                data: '',
                placement: 1,
            },
            userName: 'Austin',
        }
        this.setListName = this.setListName.bind(this);
        this.setItemData = this.setItemData.bind(this);
        this.click = this.click.bind(this);
    }

    // ***** onChange for List Name ***** //
    setListName(listName) {
        const list = {...this.state.newList};
        list.name = listName;
        this.setState({ newList: list });
    }

    // ***** onChange for Item Data ***** //
    setItemData(itemData) {
        const item = {...this.state.newItem};
        item.data = itemData;
        this.setState({ newItem: item });
    }

    // ***** onClicks ***** //
    click(button) {
        // ***** Add List Button ***** //
        if (button === 'addList') {
            return this.setState({ appState: 'addListView' });

        // ***** Submit List Button ***** //
        } else if (button === 'sumbitList') {
            fetch('/lists', {
                method: 'POST',
                body: JSON.stringify(this.state.newList),
            })
            .then(() => {
                const list = {...this.state.newList};
                list.placement += 1;
                return this.setState({
                    appState: 'listsView',
                    newList: list,
                });
            })
            .catch(err => console.log(err));
        
        // ***** Back Button ***** //
        } else if (button === 'backButton') {
            return this.setState({ appState: 'listsView' });

        // ***** Submit Item Button ***** //
        } else if (button === 'addItem') {
            fetch('/lists', {
                method: 'POST',
                body: JSON.stringify(this.state.newList),
            })
            .then(() => {
                const list = {...this.state.newList};
                list.placement += 1;
                return this.setState({
                    appState: 'listsView',
                    newList: list,
                });
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        if (this.state.appState === 'listsView') {
            return (
                <React.Fragment>
                    <HeaderContainer
                        appState={this.state.appState}
                        userName={this.state.userName}
                        click={this.click}
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
                    <NewListContainer
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

export default App;