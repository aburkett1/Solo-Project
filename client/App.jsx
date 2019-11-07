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
            currListId: null,
            newList: {
                name: '',
                placement: 1,
            },
            newItem: {
                data: '',
                placement: 1,
            },
            userName: 'Austin',
            recallLists: false,
            recallItems: false,
        }
        this.setListName = this.setListName.bind(this);
        this.setItemData = this.setItemData.bind(this);
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        fetch('/lists')
        .then(response => response.json())
        .then(response => {
            console.log('Lists fetch >> ', response);
            return this.setState({ lists: response })
        })
        .catch(err => console.log(err))
    }

    componentDidUpdate() {
        if (this.state.recallLists) {
            fetch('/lists')
            .then(response => response.json())
            .then(response => {
                console.log('Lists fetch >> ', response);
                return this.setState({
                    lists: response,
                    recallLists: false,
                })
            })
            .catch(err => console.log(err))
        } else if (this.state.recallItems) {
            fetch(`/items/${this.state.currListId}`)
            .then(response => response.json())
            .then(response => {
                return this.setState({
                    items: response,
                    recallItems: false,
                })
            })
            .catch(err => console.log(err))
        }
    }

    // ***** onChange for List Name ***** //
    setListName(listName) {
        const list = {...this.state.newList};
        list.name = listName;
        console.log('new name >> ', list.name);
        this.setState({ newList: list });
    }

    // ***** onChange for Item Data ***** //
    setItemData(itemData) {
        const item = {...this.state.newItem};
        item.data = itemData;
        this.setState({ newItem: item });
    }

    // ***** onClicks ***** //
    click(button, id, name, status) {
        // ***** Add List Button ***** //
        if (button === 'addList') {
            return this.setState({ appState: 'addListView' });

        // ***** Submit List Button ***** //
        } else if (button === 'submitList') {
            console.log('New List >> ', this.state.newList);
            fetch('/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.newList),
            })
            .then(() => {
                const list = {...this.state.newList};
                list.placement += 1;
                return this.setState({
                    appState: 'listsView',
                    newList: list,
                    recallLists: true,
                });
            })
            .catch(err => console.log(err));
        
        // ***** Back Button ***** //
        } else if (button === 'backButton') {
            return this.setState({ appState: 'listsView' });

        // ***** Submit Item Button ***** //
        } else if (button === 'submitItem') {
            fetch('/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...this.state.newItem,
                    list_id: this.state.currListId,
                }),
            })
            .then(() => {
                const item = {...this.state.newItem};
                item.placement += 1;
                return this.setState({
                    appState: 'itemsView',
                    newItem: item,
                    recallItems: true,
                });
            })
            .catch(err => console.log(err));

        // ***** Open List Button ***** //
        } else if (button === 'list') {
            fetch(`/items/${id}`)
            .then(response => response.json())
            .then(response => {
                return this.setState({
                    items: response,
                    appState: 'itemsView',
                    currListName: name,
                    currListId: id,
                })
            })
            .catch(err => console.log(err));

        // ***** CheckBox ***** //
        } else if (button === 'checkBox') {
            let completed = status ? false : true;
            fetch('/items/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    completed: completed,
                })
            })
            .then(() => {
                return this.setState({
                    recallItems: true,
                })
            })
            .catch(err => console.log(err));

        // ***** Delete Button ***** //
        } else if (button === 'deleteItem') {
            fetch(`/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                return this.setState({
                    recallItems: true,
                })
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
                        click={this.click}
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
                        click={this.click}
                    />
                </React.Fragment>
            )
        } else if (this.state.appState === 'itemsView') {
            return (
                <React.Fragment>
                    <HeaderContainer
                        appState={this.state.appState}
                        currListName={this.state.currListName}
                        click={this.click}
                    />
                    <NewItemContainer
                        setItemData={this.setItemData}
                        click={this.click}
                    />
                    <ItemsContainer
                        items={this.state.items}
                        click={this.click}
                    />
                </React.Fragment>
            )
        }
    }
}

export default App;