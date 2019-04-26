import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default class ModalAddress extends React.Component {

    state = {
        city: "",
        street: "",
        building: "",
    };

    handleCloseCancel = () => {
        this.props.closeWindow();
    };

    handleCloseOK = (e) => {
        this.props.__addAddr(this.props._editing, this.props._index, this.state.city, this.state.street, this.state.building);
        //this.setState({ city: "", street: "", building: ""});
        this.props.closeWindow();
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCloseOK();
        }
    }

    handleOpen = () => {
        // console.log("handleOpen--", this.props._editing, this.props._element)
        if (this.props._editing === true) {
            this.setState({ city: this.props._element['city']});
            this.setState({ street: this.props._element['street']});
            this.setState({ building: this.props._element['building']});
        }
        else {
            this.setState({ city: "", street: "", building: ""});
        }
    }

    render() {


        return (

            <Dialog open={this.props.openWindow} onClose={this.handleCloseCancel} onEnter={this.handleOpen}>
                <DialogTitle>Set point address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter City, Street and Building number.
                    </DialogContentText>
                    <TextField  autoFocus
                                defaultValue={this.props._element['city']}
                                id="city"
                                label="City"
                                onChange={e => this.setState({ city: e.target.value })}
                                onKeyPress={this.handleKeyPress}
                    />
                    <TextField  defaultValue={this.props._element['street']}
                                id="street"
                                label="Street"
                                onChange={e => this.setState({ street: e.target.value })}
                                onKeyPress={this.handleKeyPress}
                    />
                    <TextField  defaultValue={this.props._element['building']}
                                id="buiding"
                                label="Building"
                                onChange={e => this.setState({ building: e.target.value })}
                                onKeyPress={this.handleKeyPress}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  color="primary" onClick={this.handleCloseCancel} >
                        Cancel
                    </Button>
                    <Button  color="primary" onClick={this.handleCloseOK} >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

