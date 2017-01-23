import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map';
import colorFor from './ColorSource';
import './ParsedMixture.scss';

export default class ParsedMixture extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stage">
                <div className="stage_horizontal_left">
                    {this.renderParsedMixture()}
                </div>
                <div className="stage_horizontal_right">
                    <table className="parsed-table">
                        <tbody>
                        {map(this.props.possibleValues, (values, i) => {
                            let style = {
                                backgroundColor: colorFor(i)
                            };
                            return (
                                <tr key={values.allele} style={style}>
                                    <td className="parsed-table-name"><b>{values.allele}</b></td>
                                    <td className="parsed-table">{values.variants.join(', ')}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderParsedMixture() {
        if (isEmpty(this.props.possibleValues))
            return null;
        return (
            <div className="parsed-mixture">
                {this.props.possibleValues.map((values, i) =>
                    this.renderSegment(values, i))}
            </div>
        );
    }

    renderSegment(values, i) {
        let style = {
            backgroundColor: colorFor(i)
        };
        let segment = values.variants.map(v => values.allele + v).join('');
        return <div key={i} className="feature-block inline" style={style}>{segment}</div>;
    }
}

ParsedMixture.propTypes = {
    possibleValues: PropTypes.arrayOf(PropTypes.shape({
        allele: PropTypes.string.isRequired,
        variants: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired
};
