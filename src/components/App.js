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
                <input type="text" onInput={this.onInput}/>
                <input type="text" onInput={this.onInput} defaultValue={this.state.nrOfPeople}/>
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
                                <td key={i}>{profileGroup}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    onNrOfPeopleChanged(e) {
        let input = e.target.value;
        let nrOfPeople = Number(input);
        this.setState({nrOfPeople: nrOfPeople});
    }

    onInput(e) {
        let input = e.target.value;
        let mixture = parse(input);
        let variants = generateVariants(mixture);
        let profiles = generate(mixture, this.state.nrOfPeople);
        this.setState({mixture: mixture, allProfiles: profiles, variants: variants});
    }
}

App.propTypes = {};

App.defaultProps = {};
