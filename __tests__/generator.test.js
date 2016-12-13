import generate from '../src/generator';

test('one person has always two variants of attribute', () => {
    expect(generate({A: [1, 2]}, 1)).toEqual(['A1A2']);
});