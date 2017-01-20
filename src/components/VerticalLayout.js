import React, {Component, PropTypes} from 'react';
import './VerticalLayout.scss'

export default class VerticalLayout extends Component {

    render() {
        let styles = this.props.children ? {width: this.getChildWidth()} : {};
        return (
            <div {...this.props}>
                {this.props.children.map((child, i) =>
                    <div key={i} className="inline" style={styles}>{child}</div>
                )}
            </div>
        );
    }

    getChildWidth() {
        return (100 / this.props.children.length) + '%';
    }
}

VerticalLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};
