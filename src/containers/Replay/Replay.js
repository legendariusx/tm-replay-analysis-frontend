import { IconButton } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { REMOVE_REPLAY } from '../../actions/replay';

import './Replay.scss';

class Replay extends React.Component {
    render() {
        return (
            <div className="replay-container">
                <div className="replay-header">
                    <h3>{ this.props.replay.filename }</h3>
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