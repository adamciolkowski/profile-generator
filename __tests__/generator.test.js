import generate from '../src/generator';
import {expect} from 'chai';

test('one person has always two variants of attribute', () => {
    expect(generate({A: [1, 2]}, 1)).to.deep.equal(['A1A2']);
});

test('two people have variants that can create mixture by taking one attribute from each', () => {
    expect(generate({A: [1, 2]}, 2)).to.have.deep.members([
        ['A1A1', 'A1A2'],
        ['A1A1', 'A2A2'],
        ['A1A2', 'A1A2'],
        ['A1A2', 'A2A2']
    ]);
});

test('three people have variants that can create mixture by taking one attribute from each', () => {
    expect(generate({A: [1, 2]}, 3)).to.have.deep.members([
        ['A1A1', 'A1A1', 'A1A2'],
        ['A1A1', 'A1A1', 'A2A2'],

        ['A1A1', 'A1A2', 'A1A2'],
        ['A1A1', 'A1A2', 'A2A2'],
        ['A1A1', 'A2A2', 'A2A2'],

        ['A1A2', 'A1A2', 'A1A2'],
        ['A1A2', 'A1A2', 'A2A2'],
        ['A1A2', 'A2A2', 'A2A2']
    ]);
});