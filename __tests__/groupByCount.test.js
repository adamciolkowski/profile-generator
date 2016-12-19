import groupByCount from '../src/groupByCount';
import {expect} from 'chai';

test('should return empty object on empty array', () => {
    expect(groupByCount([])).to.deep.equal([]);
});

test('single item', () => {
    expect(groupByCount(['a'])).to.have.deep.members([
        {item: 'a', count: 1}
    ]);
});

test('two different items', () => {
    expect(groupByCount(['a', 'b'])).to.have.deep.members([
        {item: 'a', count: 1}, {item: 'b', count: 1}
    ]);
});

test('two same items', () => {
    expect(groupByCount(['a', 'a'])).to.have.deep.members([
        {item: 'a', count: 2}
    ]);
});

test('should work with objects', () => {
    expect(groupByCount([{a: 1}, {a: 1}, {b: 2}])).to.have.deep.members([
        {item: {a: 1}, count: 2},
        {item: {b: 2}, count: 1}
    ]);
});