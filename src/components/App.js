import React, {Component, PropTypes} from 'react';
import {parse} from '../parser';
import generate from '../generator';
import generateVariants from '../variantsGenerator';
import map from 'lodash/map';
import VerticalLayout from './VerticalLayout'
import './App.scss';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nrOfPeople: 3,
            mixture: {},
            allProfiles: []
        };

        this.onInput = this.onInput.bind(this);
        this.onNrOfPeopleChanged = this.onNrOfPeopleChanged.bind(this);
    }

    render() {
        var possibleValues = map(this.state.mixture, (values, key) => {
            return {
                allele: key,
                variants: values
            };
        });
        return (
            <div className="App">
                <input type="text" id="inputMixture" onInput={this.onInput}/>
                <input type="number" min={1} id="nrOfPeople" onInput={this.onNrOfPeopleChanged} defaultValue={this.state.nrOfPeople}/>

                <div id="stageI" className="stage">
                    <div id="mixture" className="stage_horizontal_left">
                        {
                            possibleValues.map((values, i) => {
                                let keysNumber = possibleValues.length;
                                let colorValue = this.colorForValue(i, keysNumber);
                                let colorValue2 = 255 - colorValue;
                                let style = {
                                    backgroundColor: `rgb(${colorValue}, ${colorValue2}, ${colorValue})`
                                };
                                let segment = values.variants.map(v => values.allele + v).join('');
                                return <font key={i} className="feature_block" style={style}>{segment}</font>;
                            })
                        }
                    </div>
                <div className="stage_horizontal_right">
                <table id="mixture_table">
                    <tbody>
                    {map(possibleValues, (values, i) => {
                        let keysNumber = possibleValues.length;
                        let colorValue = this.colorForValue(i, keysNumber);
                        let colorValue2 = 255 - colorValue;
                        let style = {
                            backgroundColor: `rgb(${colorValue}, ${colorValue2}, ${colorValue})`
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

                Possible feature pairs:
                <table>
                    <tbody>
                    {map(this.state.variants, (variants, allele) => {
                        return (
                            <tr key={allele}>
                                <td>{allele}</td>
                                <td>{variants.join(', ')}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {this.renderStageTwo()}

                Combined profiles:
                <table>
                    <tbody>
                    {map(this.state.allProfiles, (profileGroup, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td key={i}>{profileGroup}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    renderStageTwo() {
        return (
            <div>
                Etap II - generowanie możliwych par
                <VerticalLayout className="stage-container">
                    {
                        map(this.state.variants, pairs => {
                            return (
                                <div className="pair-box">
                                    <div className="center-horizontally center-vertically inline">
                                        <table className="pairs">
                                            <tbody>
                                            {
                                                map(pairs, pair => {
                                                    return (
                                                        <tr>
                                                            <td>{pair}</td>
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

    recalculate() {
        let input = document.getElementById("nrOfPeople").value;
        let inputMixture = document.getElementById("inputMixture").value;
        let nrOfPeople = Number(input);
        let mixture = parse(inputMixture);
        let variants = generateVariants(mixture);
        let profiles = generate(mixture, nrOfPeople);
        this.setState({mixture: mixture, allProfiles: profiles, variants: variants});
    }

    onNrOfPeopleChanged(e) {
        if (e.target.value.length > 0)
            this.recalculate();
    }

    colorForValue(i, len) {
        return Math.ceil(55+200*i/len);
    }

    onInput(e) {
        if (e.target.value.length > 1) {
            this.recalculate();
        }
    }
}

App.propTypes = {};

App.defaultProps = {};
