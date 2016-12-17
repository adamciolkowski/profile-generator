import allPossiblePairs from '../src/allPossiblePairs';
import {expect} from 'chai';

test('all possible pairs', () => {
    expect(allPossiblePairs([1])).to.deep.equal([[1, 1]]);
    expect(allPossiblePairs([1, 2])).to.have.deep.members([
        [1, 1], [1, 2], [2, 1], [2, 2]
    ]);
});