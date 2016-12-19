import allPossiblePairs from '../src/allPossiblePairs';
import {allPossibleNElementArrays} from '../src/allPossiblePairs';
import {expect} from 'chai';

test('all possible pairs', () => {
    expect(allPossiblePairs([1])).to.deep.equal([[1, 1]]);
    expect(allPossiblePairs([1, 2])).to.have.deep.members([
        [1, 1], [1, 2], [2, 1], [2, 2]
    ]);
});

test('all possible pairs', () => {
    expect(allPossibleNElementArrays([1], 3)).to.deep.equal([[1, 1, 1]]);
});

test('all possible pairs', () => {
    expect(allPossibleNElementArrays([1, 2], 3)).to.have.deep.members([
        [1, 1, 1], [1, 1, 2],
        [1, 2, 1], [1, 2, 2],
        [2, 1, 1], [2, 1, 2],
        [2, 2, 1], [2, 2, 2]
    ]);
});