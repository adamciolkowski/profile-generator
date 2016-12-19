import containsAll from '../src/containsAll';
import {expect} from 'chai';

test('empty array contains all elements from empty array', () => {
    expect(containsAll([], [])).to.equal(true);
});

test('should work with primitives', () => {
    expect(containsAll([2], [1])).to.equal(false);
    expect(containsAll([1, 2], [1])).to.equal(true);
});

test('should work with objects', () => {
    expect(containsAll([{a: 2}], [{a: 1}])).to.equal(false);
    expect(containsAll([{a: 1}, {a: 2}, {a: 3}], [{a: 1}])).to.equal(true);
});