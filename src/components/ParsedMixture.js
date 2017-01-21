import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import randomcolor from 'randomcolor';
import './ParsedMixture.scss';

const colors = randomcolor({
    count: 50,
    hue: 'bright'
});

export default class ParsedMixture extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="stageI" className="stage">
                <div id="mixture" className="stage_horizontal_left">
                    {
                        this.props.possibleValues.map((values, i) => {
                            let style = {
                                backgroundColor: this.colorForValue(i)
                            };
                            let segment = values.variants.map(v => values.allele + v).join('');
                            return <font key={i} className="feature_block" style={style}>{segment}</font>;
                        })
                    }
                </div>
                <div className="stage_horizontal_right">
                    <table id="mixture_table">
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