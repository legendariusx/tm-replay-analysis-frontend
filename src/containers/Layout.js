import React from 'react';

import './Layout.scss';
import Header from '../components/General/Header';
import Footer from '../components/General/Footer';
import { Paper } from '@material-ui/core';

class Layout extends React.Component {
    render() {
        return (
            <Paper color="primary" className="layout-container">
                <Header />
                { this.props.children }
                <Footer />
            </Paper>
        )
    }
}

export default Layout;