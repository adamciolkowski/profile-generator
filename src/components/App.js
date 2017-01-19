import React, {Component, PropTypes} from 'react';
import {parse} from '../parser';
import generate from '../generator';
import generateVariants from '../variantsGenerator';
import map from 'lodash/map';
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
        return (
            <div className="App">
                <input type="text" id="inputMixture" onInput={this.onInput}/>
                <input type="number" min={1} id="nrOfPeople" onInput={this.onNrOfPeopleChanged} defaultValue={this.state.nrOfPeople}/>

                <div id="mixture"></div>
                <br/>
                Mixture:
                <table>
                    <tbody>
                    {map(this.state.mixture, (variants, allele) => {
                        return (
                            <tr key={allele}>
                                <td>{allele}</td>
                                <td>{variants.join(', ')}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

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

    makeColouredMixture(mixture) {
        document.getElementById("mixture").innerHTML = "";
        let keysNumber = Object.keys(mixture).length;
        let keyNumber = 0;
        for (var k in mixture) {
            let featuresRect = document.createElement("font");
            featuresRect.id = "mixture_feature_" + k;
            let colorValue = this.colorForValue(keyNumber, keysNumber);
            let colorValue2 = 255-colorValue;
            featuresRect.style = "background-color:rgb("+colorValue+", "+colorValue2+", "+colorValue+")";
            for (var j = 0, len2 = mixture[k].length; j < len2; j++) {
                featuresRect.innerHTML += k+mixture[k][j];
            }

            document.getElementById("mixture").appendChild(featuresRect);
            keyNumber++;
        }
    }

    onInput(e) {
        if (e.target.value.length > 1) {
            this.makeColouredMixture(parse(e.target.value));
            this.recalculate();
        }
    }
}

App.propTypes = {};

App.defaultProps = {};
