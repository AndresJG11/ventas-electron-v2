import React from 'react';
import BaseComponent from '../components/BaseComponent';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AlertField extends BaseComponent {

    constructor(props) {
        super(props);
        this.typeField = "Alert";
        this.state = { isOpen: false, text : "", type: "success"}
        this.open = this.open.bind(this);
		  this.handleClose = this.handleClose.bind(this);
    }

    open(text, type) {
		 this.setState({
			 isOpen: true,
			 type: type,
			 text: text
		 })
	 }
	 handleClose(){
		 this.setState({
			 isOpen: false
		 })
	 }


    render() {
        return (
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={this.state.isOpen}
					autoHideDuration={4000}
					onClose={this.handleClose}
					>
					<Alert severity={this.state.type}>
						{this.state.text}
					</Alert>
				</Snackbar>
        );
    }
}

export default AlertField;
