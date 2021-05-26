import { connect } from "react-redux";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import "./App.scss";
import { darkTheme } from './themes/darkTheme';

import Layout from "./containers/Layout";
import Dashboard from "./containers/Dashboard";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ThemeProvider theme={darkTheme}>
                    <Layout>
                        <Dashboard />
                    </Layout>
                </ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(App);
