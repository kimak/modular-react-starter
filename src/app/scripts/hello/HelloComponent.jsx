import React, { Component } from 'react';


class HelloComponent extends Component {
    render() {
        let { title } = this.props;

        return (
            <h2>{title}</h2>
        );
    }
}

HelloComponent.defaultProps = {
    title: 'Hello World'
}

HelloComponent.propTypes = {
    title: React.PropTypes.string
};


export default HelloComponent;
