import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map';
import range from 'lodash/range';
import randomColor from 'random-color';
import './ParsedMixture.scss';

const colors = range(1, 50).map(() => randomColor().hexString());

export default class ParsedMixture extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="stage">
                <div className="stage_horizontal_left">
                    {this.renderParsedMixture()}
                </div>
                <div className="stage_horizontal_right">
                    <table>
                        <tbody>
                        {map(this.props.possibleValues, (values, i) => {
                            let style = {
                                backgroundColor: this.colorForValue(i)
                            };
                            return (
                                <tr key={values.allele} style={style}>
                                    <td>{values.allele}</td>
                                    <td>{values.variants.join(', ')}</td>
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
            backgroundColor: this.colorForValue(i)
        };
        let segment = values.variants.map(v => values.allele + v).join('');
        return <div key={i} className="feature-block inline" style={style}>{segment}</div>;
    }

    colorForValue(i) {
        return colors[i % colors.length];
    }
}

ParsedMixture.propTypes = {
    possibleValues: PropTypes.arrayOf(PropTypes.shape({
        allele: PropTypes.string.isRequired,
        variants: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired
};
