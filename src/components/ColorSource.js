import range from 'lodash/range';
import randomColor from 'random-color';

const colors = range(1, 50).map(() => randomColor().hexString());

export default function colorFor(index) {
    return colors[index % colors.length];
}