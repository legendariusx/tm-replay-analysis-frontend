import React from 'react';

class Replay extends React.Component {
    render() {
        return (
            <div className="replay-container">
                { this.props.children }
            </div>
        )
    }
}

export default Replay