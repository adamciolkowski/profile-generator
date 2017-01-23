import React, {Component, PropTypes} from 'react';
import {parse} from '../parser';
import generate from '../generator';
import generateVariants from '../variantsGenerator';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
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
        this.stageTwo = this.stageTwo.bind(this);
        this.stageThree = this.stageThree.bind(this);
    }

    render() {
        let pairsOfVariants = map(this.state.variants, identity);
        let isMixtureEntered = !isEmpty(this.state.mixture);
        return (
            <div className="App">
                <div id="comment" className="comment-layer">
                Wprowadź miksturę oraz liczbę osób ilu profile chcesz uzyskać
                </div>
                {this.renderInputs()}
                {this.renderParsedMixture()}
                <input type="button" value="Następny etap" className="next-stage-input" disabled={!isMixtureEntered}
                       onClick={this.stageTwo} id="stageTwoButton"/>
                <div id="secondStage" className="hidden">
                <PossiblePairs variants={pairsOfVariants}
                               highlightedPairs={this.state.highlightedPairs}/>
                <input type="button" value="Następny etap" className="next-stage-input" disabled={!isMixtureEntered}
                       onClick={this.stageThree} id="stageThreeButton"/>
                </div>
                <div id="thirdStage" className="hidden">
                {this.renderProfiles()}
                </div>
            </div>
        );
    }

    moveCommentToDiv(divName) {
        var original_top = document.getElementById("comment").style.top.replace(/\D/g,'');
        var destination_top = document.getElementById(divName).offsetTop;
        var intervalId = setInterval(function() {
            original_top++;
            document.getElementById("comment").style.top = original_top + 'px';

            if (destination_top < original_top) {
                clearInterval(intervalId);
            }
        }, 20);
    }

    stageTwo() {
        document.getElementById("stageTwoButton").style.display = 'none';
        document.getElementById("secondStage").style.display = 'block';
        document.getElementById("comment").innerHTML = 'Dla każdej cechy generowane są jej wszystkie możliwe kombinacje';
        this.moveCommentToDiv("secondStage");
    }

    stageThree() {
        document.getElementById("stageThreeButton").style.display = 'none';
        document.getElementById("thirdStage").style.display = 'block';
        document.getElementById("comment").innerHTML = 'Profil powstaje przez złożenie wszystkich możliwych par cech';
        this.moveCommentToDiv("thirdStage");
    }

    renderInputs() {
        return (
            <div>
                <b>Wprowadź parametry:</b>
                <div className="stage-container">
                    <input type="text" id="inputMixture" className="mixture-input"
                           placeholder="Mieszanina" onInput={this.onInput}/>
                    <input type="number" min={1} id="nrOfPeople" className="nr-of-people-input"
                           placeholder="Liczba osób"
                           onInput={this.onNrOfPeopleChanged}
                           defaultValue={this.state.nrOfPeople}/>
                </div>
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
                <div className="stage-container">
                    <table className="profile-table">
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
