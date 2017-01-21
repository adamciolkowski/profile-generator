import React, {Component, PropTypes} from 'react';
import VerticalLayout from './VerticalLayout';
import includes from 'lodash/includes';
import map from 'lodash/map';
import './PossiblePairs.scss';

export default class PossiblePairs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <b>Etap II - generowanie możliwych par</b>
                <VerticalLayout className="stage-container">
                    {
                        map(this.props.variants, (pairs, key) => {
                            return (
                                <div key={key} className="pair-box">
                                    <div className="center-horizontally center-vertically inline">
                                        <table className="pairs">
                                            <tbody>
                                            {
                                                map(pairs, (pair, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className={this.classFor(pair)}>{pair}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })
                    }
                </VerticalLayout>
            </div>
        );
    }

    classFor(pair) {
        let isHighlighted = includes(this.props.highlightedPairs, pair);
        return isHighlighted ? 'highlighted' : null;
    }
}

PossiblePairs.propTypes = {
    variants: PropTypes.object.isRequired,
    highlightedPairs: PropTypes.array.isRequired
};
