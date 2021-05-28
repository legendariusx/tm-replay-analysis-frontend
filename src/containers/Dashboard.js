import React from 'react';
import { connect } from 'react-redux';
import GeneralInformation from '../components/Replay/GeneralInformation';

import './Dashborad.scss';
import DataDisplay from './Replay/DataDisplay';
import InputVisualisation from './Replay/InputVisualisation';
import Replay from './Replay/Replay';
import ReplayUploader from './Replay/ReplayUploader';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <ReplayUploader />
                {
                    this.props.replays.replays.map(replay => {
                        return (
                            <Replay replay={replay} key={replay.id}>
                                <GeneralInformation replay={replay} />
                                <InputVisualisation replay={replay} />
                                <DataDisplay replay={replay} />
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