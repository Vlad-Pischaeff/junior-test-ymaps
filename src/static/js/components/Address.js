import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LocationCity from '@material-ui/icons/LocationCity';
import CloseIcon from '@material-ui/icons/Close';
import {sortableHandle} from 'react-sortable-hoc';

class Address extends React.Component {

    render() {

        const {value, index} = this.props;

        const DragHandle = sortableHandle(() =>
            <Avatar style={{ backgroundColor: '#ccc', color: '#000' }} >
                <LocationCity />
            </Avatar>
        );
        console.log("value--", value['city'], this.props.value);

        return (
            <ListItem style={{ paddingLeft: '0', paddintRight: '0', paddingTop: '0', paddingBottom: '0' }}>
                <ListItem button onClick={()=>this.props.handleClickItem(value, index)}
                          onContextMenu={()=>this.props.handleClickItem(value, index)}
                          style={{ paddingLeft: '0', paddintRight: '0', paddingTop: '0', paddingBottom: '0' }}>

                    <DragHandle />
                    <ListItemText primary={value['city']}
                                  secondary={value['street'] + ", " + value['building']}
                                  style={{width:"100%"}} />
                </ListItem>
                <IconButton size="small" style={{position: 'absolute', right: "4px", top: "0px"}}
                            onClick={()=>this.props.handleRemoveItem(index)} >
                    <CloseIcon />
                </IconButton>
            </ListItem>
        );
    }
}

export default Address;


