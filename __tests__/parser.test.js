import {parse} from '../src/parser.js'

test('Single variant', () => {
    let variants = parse('A1');
    expect(variants).toEqual(
            {
                A: [1],
            });
})

test('Three variants', () => {
    let variants = parse('A1A2A3');
    expect(variants).toEqual(
            {
                A: [1, 2, 3],
            });
})

test('Two features', () => {
    let variants = parse('A1A2A3B1B2');
    expect(variants).toEqual(
            {
                A: [1, 2, 3],
                B: [1, 2]
            });
})

test('Three features', () => {
    let variants = parse('A1A2A3B1C1C2C3');
    expect(variants).toEqual(
            {
                A: [1, 2, 3],
                B: [1],
                C: [1, 2, 3]
            });
})

test('Second broken variant', () => {
    let variants = parse('A1A');
    expect(variants).toEqual(
            {
                A: [1],
            });
})
