import generate from '../src/generator';
import {expect} from 'chai';

test('one person has always two variants of attribute', () => {
    expect(generate({A: [1, 2]}, 1)).to.deep.equal(['A1A2']);
});