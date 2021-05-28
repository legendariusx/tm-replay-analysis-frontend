import React from 'react';
import { connect } from 'react-redux';
import Metrics from '../../components/Replay/DataDisplay/Metrics';

import './DataDisplay.scss';

class DataDisplay extends React.Component {
    render() {
        const {
            replay
        } = this.props;

        return (
            <div className="data-display-container">
                <h3>Data</h3>
                <Metrics replay={replay} />
            </div>
        )
    }
}

export default connect()(DataDisplay)