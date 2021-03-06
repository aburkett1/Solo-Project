import React, { Component } from 'react';

// ***** Containers / Components ***** //
import HeaderContainer from './containers/headerContainer.jsx';
import ListsContainer from './containers/listsContainter.jsx';
import NewListContainer from './containers/newListContainer.jsx';
import SearchLists from './components/searchLists.jsx';
import NewItemContainer from './containers/newItemContainer.jsx';
import ItemsContainer from './containers/itemsContainer.jsx';
import EditListModal from './components/editList.jsx';
import EditItemModal from './components/editItem.jsx';
import Particles from 'react-particles-js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: 'listsView',
            lists: [],
            items: [],
            currListName: '',
            currListId: null,
            editListName: '',
            editListId: null,
            editItemData: '',
            editItemId: null,
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
        this.newItemData = this.newItemData.bind(this);
        this.newListName = this.newListName.bind(this);
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

    // ***** onChange for new Item Data ***** //
    newItemData(itemData) {
        this.setState({ editItemData: itemData })
    }

    // ***** onChange for new Item Data ***** //
    newListName(listName) {
        this.setState({ editListName: listName })
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

        // ***** Back Out of Item Editing ***** //
        } else if (button === 'backToItems') {
            return this.setState({
                appState: 'itemsView',
            })

        // ***** Submit New Item Data ***** //
        } else if (button === 'submitNewData') {
            console.log('new item id >> ', this.state.editItemId, ', new item data >> ', this.state.editItemData)
            fetch('/items/data', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.editItemId,
                    data: this.state.editItemData,
                })
            })
            .then(() => {
                return this.setState({
                    appState: 'itemsView',
                    recallItems: true,
                })
            })
            .catch(err => console.log(err));

        // ***** Open Edit Item Modal ***** //
        }  else if (button === 'editItem') {
            return this.setState({
                editItemId: id,
                editItemData: name,
                appState: 'editItemView',
            })

        // ***** Delete List ***** //
        } else if (button === 'deleteList') {
            fetch(`/lists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                return this.setState({
                    recallLists: true,
                })
            })
            .catch(err => console.log(err));

        // ***** Back Out of List Editing ***** //
        } else if (button === 'backToLists') {
            return this.setState({
                appState: 'listsView',
            })

        // ***** Submit New List Name ***** //
        } else if (button === 'submitNewName') {
            fetch('/lists/name', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.editListId,
                    name: this.state.editListName,
                })
            })
            .then(() => {
                return this.setState({
                    appState: 'listsView',
                    recallLists: true,
                })
            })
            .catch(err => console.log(err));

        // ***** Open Edit List Module ***** //
        } else if (button === 'editList') {
            return this.setState({
                editListId: id,
                editListName: name,
                appState: 'editListView',
            })
        }
    }

    render() {
        console.log(this.state.appState);
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
                </React.Fragment>
            )
        } else if (this.state.appState === 'editListView') {
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
                    <EditListModal
                        editListName={this.state.editListName}
                        click={this.click}
                        newListName={this.newListName}
                    />
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
                </React.Fragment>
            )
        } else if (this.state.appState === 'editItemView') {
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
                    <EditItemModal 
                        editItemData={this.state.editItemData}
                        click={this.click}
                        newItemData={this.newItemData}
                    />
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
                </React.Fragment>
            )
        }
    }
}

export default App;