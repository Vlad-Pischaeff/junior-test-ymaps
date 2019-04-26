import React from 'react';
import Address from './Address';
import ModalAddress from './ModalAddress';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import {SortableContainer, SortableElement, } from 'react-sortable-hoc';
import arrayMove from 'array-move';

class LeftMenu extends React.Component {
    state = {
        openAddress: false,
        index: 0,
        element: {},
        editing: false,
    };

    handleClickOpen = () => {
        this.setState({ openAddress: true, });
    };

    handleCloseWindow = () => {
        this.setState({ openAddress: false, });
        this.setState({ editing: false, });
        this.setState({ element: {}, });
    }

    _handleClickItem = (n, i) => {
        console.log("click item--", n, i);
        this.setState({ openAddress: true, });
        this.setState({ index: i, });
        this.setState({ element: n, });
        this.setState({ editing: true, });
    }

    _handleRemoveItem = (i) => {
        this.props._removeItem(i);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        var arr1 = arrayMove(this.props._points, oldIndex, newIndex);
        var arr2 = arrayMove(this.props._coords, oldIndex, newIndex);
        this.props._onSortEnd(arr1, arr2);
    };


    render() {
        const {_points} = this.props;

        const SortableItem = SortableElement(({value, index}) =>
            <Address value={value} index={index} handleRemoveItem={this._handleRemoveItem}
                     handleClickItem={this._handleClickItem}  />
        );

        const SortableList = SortableContainer(({items}) => {
            return (
                <div style={{ width:"100%" }}>
                    {items.map((value, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={value} />
                    ))}
                </div>
            );
        });

        console.log("leftMenuprops--", this.props._points, this.props._coords);

        return (
            <div >
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}
                        style={{position: 'absolute', left: "5px", top: "5px"}} >
                    <AddIcon />
                    Add point
                </Button>

                <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                      style={{position: 'absolute', left: "0px", top: "50px", width:"20%"}} >

                    <SortableList items={_points} onSortEnd={this.onSortEnd} useDragHandle />

                </Grid>

                <ModalAddress openWindow={this.state.openAddress}
                              closeWindow={this.handleCloseWindow}
                              __addAddr={this.props._addAddr}
                              __points={this.props._points}
                              _editing={this.state.editing}
                              _element={this.state.element}
                              _index={this.state.index} />
            </div>
        );
    }
}

export default LeftMenu;
