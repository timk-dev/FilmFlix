import React from 'react';
import PropTypes from 'prop-types';

class Delayed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}

{/*In the file write
    <Delayed waitBeforeShow={1500}>
        <div>some child</div>
    </Delayed>

    used from "goulashsoup" at:
    https://stackoverflow.com/questions/30803440/delayed-rendering-of-react-components
*/}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;