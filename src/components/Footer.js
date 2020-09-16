
import React           from 'react';
import BaseComponent   from '../components/BaseComponent';

class Footer extends BaseComponent{

    constructor(props){
        super(props);
        this.typeField = "Footer";
    }
    render() {
        return (
			  <footer>
			  		SOY EL FOOTER
			  </footer>
        );
    }
}

export default Footer;
