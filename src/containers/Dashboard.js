import React from 'react';
import { connect } from 'react-redux';

import './Dashborad.scss';
import InputVisualisation from './Replay/InputVisualisation';
import Replay from './Replay/Replay';
import ReplayUploader from './Replay/ReplayUploader';

class Dashboard extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render() {
        return (
            <div className="dashboard">
                <ReplayUploader />
                {
                    this.props.replays.replays.map(replay => {
                        return (
                            <Replay replay={replay} key={replay.id}>
                                <InputVisualisation replay={replay} />
                            </Replay>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        replays: state.replays,
    };
};

export default connect(mapStateToProps)(Dashboard);