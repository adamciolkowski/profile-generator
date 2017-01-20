import generate from '../src/generator';
import {expect} from 'chai';

test('each person has always two variants of attribute', () => {
    expect(generate({A: [1, 2]}, 1)).to.deep.equal([['A1A1']]);
    expect(generate({A: [1, 2]}, 2)).to.deep.equal([['A1A1'], ['A1A2']]);
    expect(generate({A: [1, 2]}, 3)).to.deep.equal([['A1A1'], ['A1A2'], ['A2A2']]);
    expect(generate({A: [1, 2]}, 4)).to.deep.equal([['A1A1'], ['A1A2'], ['A2A2']]);
    expect(generate({A: [1, 2, 3]}, 6)).to.deep.equal([['A1A1'], ['A1A2'], ['A1A3'], ['A2A2'], ['A2A3'], ['A3A3']]);
    expect(generate({A: [1, 2, 3]}, 6)).to.deep.equal([['A1A1'], ['A1A2'], ['A1A3'], ['A2A2'], ['A2A3'], ['A3A3']]);
});

test('simple test of multiple features', () => {
    expect(generate({A: [1], B: [1]}, 1)).to.have.deep.members(
            [['A1A1', 'B1B1']]);
});
test('test of multiple features', () => {
    expect(generate({A: [1, 2], B: [1, 2]}, 9)).to.have.deep.members(
            [['A1A1', 'B1B1'], ['A1A1', 'B1B2'], ['A1A1', 'B2B2'],
             ['A2A2', 'B1B1'], ['A2A2', 'B1B2'], ['A2A2', 'B2B2'],
             ['A1A2', 'B1B1'], ['A1A2', 'B1B2'], ['A1A2', 'B2B2']]);
});
