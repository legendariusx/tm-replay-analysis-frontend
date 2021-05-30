import { IconButton } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { REMOVE_REPLAY } from '../../actions/replay';
import StatusDisplay from '../../components/Replay/StatusDisplay';

import './Replay.scss';

class Replay extends React.Component {
    render() {
        console.log(this.props.replay.inputs.filter(i => i.action === 'gas'))

        return (
            <div className="replay-container">
                <div className="replay-header">
                    <div className="replay-title">
                        <h3>{ this.props.replay.filename }</h3>
                        <StatusDisplay status={this.props.replay.status} error={this.props.replay.error} />
                    </div>
                    <IconButton className="replay-remove" onClick={() => this.props.removeReplay(this.props.replay.id)}>
                        <i className="mdi mdi-close" />
                    </IconButton>
                </div>
                { this.props.children }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeReplay: (id) => dispatch({ type: REMOVE_REPLAY, value: id })
    }
}

export default connect(null, mapDispatchToProps)(Replay)