import React, {Component, PropTypes} from 'react';
import {parse} from '../parser';
import generate from '../generator';
import generateVariants from '../variantsGenerator';
import map from 'lodash/map';
import ParesedMixture from './ParsedMixture';
import PossiblePairs from './PossiblePairs';
import './App.scss';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nrOfPeople: 3,
            mixture: {},
            allProfiles: [],
            variants: {},
            highlightedPairs: []
        };

        this.onInput = this.onInput.bind(this);
        this.onNrOfPeopleChanged = this.onNrOfPeopleChanged.bind(this);
    }

    render() {
        return (
            <div className="App">
                <input type="text" id="inputMixture" onInput={this.onInput}/>
                <input type="number" min={1} id="nrOfPeople" onInput={this.onNrOfPeopleChanged} defaultValue={this.state.nrOfPeople}/>

                {this.renderParsedMixture()}
                <PossiblePairs variants={this.state.variants}
                               highlightedPairs={this.state.highlightedPairs}/>
                {this.renderProfiles()}
            </div>
        );
    }

    renderParsedMixture() {
        let possibleValues = map(this.state.mixture, (values, key) => {
            return {
                allele: key,
                variants: values
            };
        });
        return <ParesedMixture possibleValues={possibleValues}/>
    }

    renderProfiles() {
        return (
            <div>
                <b>Etap III - utworzone profile</b>
                <table>
                    <tbody>
                    {map(this.state.allProfiles, (profileGroup, i) => {
                        return (
                            <tr key={i}
                                className="generated-profile"
                                onMouseEnter={() => this.highlightPairs(profileGroup)}
                                onMouseLeave={() => this.clearHighlight()}>
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

    highlightPairs(pairs) {
        this.setState({highlightedPairs: pairs});
    }

    clearHighlight() {
        this.highlightPairs([]);
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

    onInput(e) {
        if (e.target.value.length > 1) {
            this.recalculate();
        }
    }
}
