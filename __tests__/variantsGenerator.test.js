import generateVariants from '../src/variantsGenerator';
import {expect} from 'chai';

test('one person has always two variants of attribute', () => {
    expect(generateVariants({A: [1, 2]})).to.deep.equal({
        A: ['A1A1', 'A1A2', 'A2A2']
    });
});

test('one person has always two variants of attribute', () => {
    expect(generateVariants({A: [1, 2], B: [1]})).to.deep.equal({
        A: ['A1A1', 'A1A2', 'A2A2'],
        B: ['B1B1']
    });
});