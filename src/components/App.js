import React, {Component, PropTypes} from 'react';
import {parse} from '../parser';
import generate from '../generator';
import generateVariants from '../variantsGenerator';
import map from 'lodash/map';
import randomcolor from 'randomcolor';
import VerticalLayout from './VerticalLayout'
import './App.scss';

const colors = randomcolor({
    count: 50,
    hue: 'bright'
});

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
                    {map(possibleValues, (values, i) => {
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

                {this.renderStageTwo()}
                {this.renderProfiles()}
            </div>
        );
    }

    renderStageTwo() {
        return (
            <div>
                <b>Etap II - generowanie możliwych par</b>
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

    renderProfiles() {
        return (
            <div>
                <b>Etap III - utworzone profile</b>
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

    colorForValue(i) {
        return colors[i % colors.length];
    }

    onInput(e) {
        if (e.target.value.length > 1) {
            this.recalculate();
        }
    }
}
